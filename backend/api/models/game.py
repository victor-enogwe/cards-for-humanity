from django.core.validators import MinValueValidator
from django.db import models
from pgtrigger import Delete, F, Protect, Q, Update, register
from pgtrigger.core import FSM

from api.models.timestamp import TimestampBase
from api.utils.enums import GameStatus
from api.utils.functions import join_end_default
from api.utils.validators import min_max_validator
from config.settings import AUTH_USER_MODEL


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
            | Q(
                old__private__df=F("new__private"),
                old__status__in=[
                    GameStatus.GS,
                    GameStatus.GC,
                    GameStatus.GAC,
                    GameStatus.GAA,
                    GameStatus.GE,
                ],
            )
            | Q(old__winner_id__isnull=False)
            | Q(old__status=GameStatus.GE)
        ),
    ),
    FSM(
        name="validate_game_status_transitions",
        field="status",
        transitions=(
            (GameStatus.GAP, GameStatus.GS),
            (GameStatus.GAP, GameStatus.GC),
            (GameStatus.GAC, GameStatus.GAA),
            (GameStatus.GAA, GameStatus.GAC),
            (GameStatus.GAP, GameStatus.GE),
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
        max_length=20, choices=GameStatus.choices, default=GameStatus.GAP
    )
    winner = models.ForeignKey(
        "api.Player",
        on_delete=models.CASCADE,
        blank=True,
        related_name="winner",
        null=True,
    )
    objects = models.Manager()

    class Meta:
        constraints = [
            models.UniqueConstraint(
                name="unique_game_status",
                fields=("creator",),
                condition=Q(status=GameStatus.GAP),
            )
        ]

    def __str__(self):
        return "Game: {0}".format(self.id)
