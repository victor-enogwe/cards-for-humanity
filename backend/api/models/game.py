from functools import reduce
from operator import and_
from random import sample

from api.celery import celery_app
from api.models.timestamp import TimestampBase
from api.utils.enums import GameStatus
from api.utils.functions import join_end_default
from api.utils.sql import GAME_TRIGGER
from api.utils.validators import min_max_validator
from config.settings import AUTH_USER_MODEL
from django.apps import apps
from django.core.validators import MinValueValidator
from django.db import models
from django_celery_beat.models import IntervalSchedule, PeriodicTask
from django_redis import get_redis_connection, pool
from kombu.utils.json import dumps
from pgtrigger import Delete, F, Protect, Q, Update, register
from pgtrigger.core import FSM, Before, Trigger


@register(
    Protect(name="protect_deletes_game", operation=Delete),
    Protect(
        name="protect_fields_game",
        operation=Update,
        condition=(
            Q(old__created_at__df=F("new__created_at"))
            | Q(old__creator_id__df=F("new__creator_id"))
            | Q(old__round_time__df=F("new__round_time"))
            | Q(old__rounds__df=F("new__rounds"))
            | Q(old__num_players__df=F("new__num_players"))
            | Q(old__num_spectators__df=F("new__num_spectators"))
            | Q(old__winner_id__isnull=False)
            | Q(old__private__df=F("new__private"))
            & Q(old__status__df=GameStatus.GAP._value_)
            | Q(new__task__isnull=False) & Q(old__status__df=GameStatus.GE._value_)
        ),
    ),
    Trigger(
        name="protect_players_creation",
        operation=(Update),
        when=Before,
        declare=[
            ("game_summary", "RECORD"),
        ],
        func=GAME_TRIGGER,
    ),
    FSM(
        name="validate_game_status_transitions",
        field="status",
        transitions=(
            (GameStatus.GAP._value_, GameStatus.GS._value_),
            (GameStatus.GAP._value_, GameStatus.GE._value_),
            (GameStatus.GS._value_, GameStatus.GACQ._value_),
            (GameStatus.GACQ._value_, GameStatus.GAPA._value_),
            (GameStatus.GAPA._value_, GameStatus.GACA._value_),
            (GameStatus.GACA._value_, GameStatus.GSRR._value_),
            (GameStatus.GSRR._value_, GameStatus.GACQ._value_),
            (GameStatus.GSRR._value_, GameStatus.GE._value_),
        ),
    ),
)
class Game(TimestampBase):
    creator = models.ForeignKey(
        AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="game_set",
        editable=False,
    )
    private = models.BooleanField(default=True)
    genres = models.ManyToManyField("api.Genre")
    join_ends_at = models.DateTimeField(
        default=join_end_default,
        validators=[MinValueValidator(limit_value=join_end_default)],
        help_text="seconds",
    )
    round_time = models.SmallIntegerField(
        default=10, validators=min_max_validator(10, 60), help_text="seconds"
    )
    rounds = models.SmallIntegerField(
        default=5,
        validators=min_max_validator(5, 50),
        help_text="no of game rounds",
        editable=False,
    )
    round = models.SmallIntegerField(
        default=0,
        validators=min_max_validator(1, 50),
        help_text="game round",
        editable=False,
    )
    num_players = models.PositiveSmallIntegerField(
        default=3,
        validators=min_max_validator(3, 9),
        help_text="no of players",
        editable=False,
    )
    num_spectators = models.PositiveSmallIntegerField(
        default=0,
        validators=min_max_validator(0, 10),
        help_text="no of spectators",
        editable=False,
    )
    status = models.CharField(
        max_length=23, choices=GameStatus.choices(), default=GameStatus.GAP._value_
    )
    winner = models.ForeignKey(
        "api.Player",
        on_delete=models.CASCADE,
        blank=True,
        related_name="winner",
        null=True,
    )
    task = models.OneToOneField(
        PeriodicTask,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        editable=False,
    )
    objects = models.Manager()

    class Meta:
        constraints = [
            models.UniqueConstraint(
                name="unique_game_status",
                fields=("creator",),
                condition=Q(status=GameStatus.GAP._value_),
            ),
        ]

    def __str__(self):
        return "Game: {0}".format(self.id)

    def create_task(self):
        task, created = PeriodicTask.objects.get_or_create(
            name=self.pk,
            task="api.game_heartbeat",
            interval=self.interval,
            args=dumps([self.pk]),
        )

        self.task = task

        self.save()

        return task

    def remove_task(self):
        if self.task:
            celery_app.control.revoke(self.task.id, terminate=True)
            return self.task.delete() if self.task != None else None

    def select_czar(self):
        redis: pool.Redis = get_redis_connection("default")
        key_prefix = f"czar-{self.pk}"
        round = self.round + 1
        players = self.player_set.all()
        czars_instance = redis.hgetall(key_prefix)
        czars = list([czar.decode("utf-8") for czar in czars_instance.values()])
        players_length = len(players)
        czars_length = len(czars)
        rotate = czars_length > 0 and czars_length >= players_length

        if rotate:
            all_czars = list(czars_instance.keys())
            redis.hdel(key_prefix, *all_czars)
            czars = []

        players.filter(game=self).update(czar=False)

        czar = players.filter(~Q(id__in=czars)).first()

        czar.czar = True

        czar.save()

        redis.hset(key_prefix, round, czar.pk)

    @property
    def interval(self):
        interval, created = IntervalSchedule.objects.get_or_create(
            every=self.round_time + 5, period=IntervalSchedule.SECONDS
        )

        return interval

    @property
    def available_questions(self):
        if self.round == 0:
            return None

        question_model = apps.get_model("api.AvailableQuestion")
        all_questions = question_model.objects.filter(game=self)
        questions = all_questions.filter(round=self.round)
        len_questions = len(questions)

        if len_questions > 0:
            return questions

        card_model = apps.get_model("api.BlackCard")
        genres = self.genres.all()
        existing_cards = [quest.card.id for quest in all_questions]
        cards = card_model.objects.filter(~Q(id__in=existing_cards), genre__in=genres)
        card_ids = sample([card.id for card in cards], 4)
        cards = card_model.objects.filter(id__in=card_ids)
        question_model.objects.bulk_create(
            [question_model(game=self, round=self.round, card=card) for card in cards]
        )

        return self.available_questions

    @property
    def available_answers(self):
        if self.round < 1:
            return None

        if self.question == None:
            return None

        answer_model = apps.get_model("api.AvailableAnswer")
        all_answers = answer_model.objects.filter(game=self)
        answers = all_answers.filter(round=self.round)
        len_answers = len(answers)

        if len_answers > 0:
            return answers

        card_model = apps.get_model("api.WhiteCard")
        genres = self.genres.all()
        existing_cards = [quest.card.id for quest in all_answers]
        cards = card_model.objects.filter(~Q(id__in=existing_cards), genre__in=genres)
        cards = cards.values_list("id", flat=True)
        card_ids = sample(list(cards), 12 * self.num_players - 1)
        cards = card_model.objects.filter(id__in=card_ids)
        answer_model.objects.bulk_create(
            [answer_model(game=self, round=self.round, card=card) for card in cards]
        )

        return self.available_answers

    @property
    def question(self):
        try:
            return self.question_set.get(round=self.round)
        except:
            return None

    @property
    def answers(self):
        try:
            nodes = self.answer_set.filter(round=self.round)

            return None if len(list(nodes)) < 1 else nodes
        except:
            return None
