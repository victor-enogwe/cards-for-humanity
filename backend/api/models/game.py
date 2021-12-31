from functools import reduce
from operator import and_
from random import sample

from api.models.timestamp import TimestampBase
from api.utils.enums import BlackCardPickChoices, GameStatus
from api.utils.functions import join_end_default
from api.utils.validators import min_max_validator
from config.settings import AUTH_USER_MODEL
from django.apps import apps
from django.core.validators import MinValueValidator
from django.db import models
from django_celery_beat.models import IntervalSchedule, PeriodicTask
from django_redis import get_redis_connection, pool
from kombu.utils.json import dumps
from pgtrigger import Delete, F, Protect, Q, Update, register
from pgtrigger.core import FSM


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
            | Q(old__task__df=F("new__task"), old__status__df=GameStatus.GE)
            | Q(old__task=F("new__task"), old__status=GameStatus.GE)
            | Q(old__winner_id__isnull=False)
            | Q(
                old__private__df=F("new__private"),
                old__status__df=GameStatus.GAP,
            )
        ),
    ),
    FSM(
        name="validate_game_status_transitions",
        field="status",
        transitions=(
            (GameStatus.GAP, GameStatus.GS),
            (GameStatus.GAP, GameStatus.GE),
            (GameStatus.GS, GameStatus.GAC),
            (GameStatus.GAC, GameStatus.GAA),
            (GameStatus.GAA, GameStatus.GAC),
            (GameStatus.GAA, GameStatus.GE),
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
        default=1,
        validators=min_max_validator(1, 9),
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
        max_length=20, choices=GameStatus.choices(), default=GameStatus.GAP
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
                condition=Q(status=GameStatus.GAP),
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
        questions = question_model.objects.filter(game=self, round=self.round)
        questions = [question.card for question in questions]
        len_questions = len(questions)

        if len_questions > 0:
            return questions

        card_model = apps.get_model("api.BlackCard")
        genres = self.genres.all()
        cards = card_model.objects.filter(genre__in=genres)
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

        question = self.question.card
        text = question.sanitized_text()
        picks = {
            [BlackCardPickChoices.PICK_ONE]: 1,
            [BlackCardPickChoices.PICK_TWO]: 2,
            [BlackCardPickChoices.PICK_THREE]: 3,
        }
        print(picks)
        pick = picks[question.pick]
        answer_model = apps.get_model("api.AvailableAnswer")
        answers = answer_model.objects.filter(game=self, round=self.round)
        answers = [answer.card for answer in answers]
        len_answers = len(answers)

        if len_answers > 0:
            return answers

        card_model = apps.get_model("api.WhiteCard")
        cards = card_model.objects.filter(
            reduce(and_, [Q(text__icontains=word) for word in text]),
            genres__in=self.genres,
        ).values_list("id", flat=True)
        card_ids = sample(list(cards), 12 * pick)
        cards = card_model.objects.filter(id__in=card_ids)
        answer_model.objects.bulk_create(
            [answer_model(game=self, round=self.round, card=card) for card in cards]
        )

        return self.available_answers

    @property
    def question(self):
        return self.question_set.objects.get(round=self.round).card

    @property
    def answers(self):
        return self.answer_set.objects.filter(round=self.round).values("card")
