from api.models.timestamp import TimestampBase
from api.utils.enums import Avatars
from api.utils.sql import PLAYER_TRIGGER
from config.settings import AUTH_USER_MODEL
from django.db import models
from pgtrigger import F, Insert, Protect, Q, Update, register
from pgtrigger.core import Before, Trigger


@register(
    Trigger(
        name="protect_players_creation",
        operation=(Insert | Update),
        when=Before,
        declare=[
            ("game_summary", "RECORD"),
        ],
        func=PLAYER_TRIGGER,
    ),
    Protect(
        name="protect_fields_player",
        operation=Update,
        condition=(
            Q(old__game_id__df=F("new__game_id"))
            | Q(old__user_id__df=F("new__user_id"))
            | Q(old__spectator__df=F("new__spectator"))
            | Q(old__avatar__df=F("new__avatar"))
            | Q(old__created_at__df=F("new__created_at"))
        ),
    ),
)
class Player(TimestampBase):
    game = models.ForeignKey(
        "api.Game", on_delete=models.CASCADE, related_name="player_set"
    )
    user = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE)
    score = models.PositiveSmallIntegerField(default=0)
    czar = models.BooleanField(default=False)
    spectator = models.BooleanField(default=False)
    avatar = models.CharField(
        max_length=20, choices=Avatars.choices(), default=Avatars.DOROTHY
    )
    objects = models.Manager()

    def __str__(self):
        return "Player: {0}".format(self.user.id)

    class Meta:
        indexes = (
            models.Index(fields=("czar",)),
            models.Index(fields=("score",)),
        )
        constraints = [
            # restrict duplicate join
            models.UniqueConstraint(
                name="unique_player_game",
                fields=(
                    "user",
                    "game",
                ),
            ),
            # unique czar
            models.UniqueConstraint(
                name="unique_player_game_czar",
                fields=("game",),
                condition=models.Q(czar=True),
            ),
            # unique avatar
            models.UniqueConstraint(
                name="unique_player_game_avatar",
                fields=(
                    "game",
                    "avatar",
                ),
            ),
        ]
