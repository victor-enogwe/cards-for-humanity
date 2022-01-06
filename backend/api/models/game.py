from datetime import timedelta
from random import randrange, sample

from api.celery import celery_app
from api.models.question import Question
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
            | Q(old__status=GameStatus.GE._value_) & Q(old__task__isnull=True)
        ),
    ),
    Trigger(
        name="protect_game_start",
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
            (GameStatus.GSRR._value_, GameStatus.GRF._value_),
            (GameStatus.GRF._value_, GameStatus.GE._value_),
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
    round_time = models.PositiveSmallIntegerField(
        default=10, validators=min_max_validator(10, 60), help_text="seconds"
    )
    rounds = models.PositiveSmallIntegerField(
        default=5,
        validators=min_max_validator(5, 50),
        help_text="no of game rounds",
        editable=False,
    )
    round = models.PositiveSmallIntegerField(
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
            task_model = apps.get_model("django_celery_beat.PeriodicTask")
            celery_app.control.revoke(self.task.id, terminate=True)
            return (
                task_model.objects.get(pk=self.task.id).delete()
                if self.task is not None
                else None
            )

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

        if self.question is None:
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

        except Question.DoesNotExist:
            if self.status == GameStatus.GAPA._value_:
                player = self.czar
                round = self.round
                available_questions = self.available_questions
                random_index = randrange(len(available_questions))
                card = self.available_questions[random_index].card
                question_model = apps.get_model("api.Question")
                question = question_model(
                    player=player, game=self, card=card, round=round
                )
                question.save()

                return question

            return None

    @property
    def answers(self):
        if self.status not in [GameStatus.GACA._value_, GameStatus.GSRR._value_]:
            return None

        nodes = self.answer_set.filter(round=self.round)
        answers_len = len(nodes)
        pick = self.question.card.pick

        if answers_len < 1:
            players = self.player_set.order_by("created_at").all()
            players_len = len(players)
            available_answers = self.available_answers
            nodes = sample(list(available_answers), pick * players_len)
            answer_model = apps.get_model("api.Answer")
            question = self.question.card

            for index, player in enumerate(players):
                start = index * pick
                stop = start + pick
                answer_nodes = nodes[start:stop]

                for answer_node in answer_nodes:
                    card = answer_model(
                        player=player,
                        game=self,
                        question=question,
                        card=answer_node.card,
                        round=self.round,
                    )
                    card.save()

            return self.answers

        return None if len(list(nodes)) < 1 else nodes

    @property
    def czar_answers(self):
        if self.status != GameStatus.GSRR._value_:
            return None

        answers = self.answers.filter(selected=True)
        answers_len = len(answers)

        if answers_len < 1:
            pick = self.question.card.pick
            answers = sample(list(self.answers), pick)

            for answer in answers:
                answer.selected = True
                answer.player.score += 10
                answer.save()
                answer.player.save()  # @TODO lazy - move to receiver duplicated code

        return None if len(answers) < 1 else answers

    @property
    def czar(self):
        if self.round < 1:
            return None

        players = self.player_set.order_by("created_at").all()
        players_length = len(players)
        index = self.round % players_length
        czar = players[index]

        return czar

    @property
    def tick(self):
        return (
            self.task.last_run_at + timedelta(seconds=self.round_time + 5)
            if self.task.last_run_at
            else None
        )
