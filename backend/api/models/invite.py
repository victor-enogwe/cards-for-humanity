from api.models.timestamp import TimestampBase
from api.utils.sql import INVITE_TRIGGER
from django.db import models
from django.utils import timezone
from pgtrigger import F, Insert, Protect, Q, Update, register
from pgtrigger.core import Before, Trigger


@register(
    Trigger(
        name="protect_invite_game_creator",
        operation=Insert,
        when=Before,
        declare=[
            ("game_summary", "RECORD"),
        ],
        func=INVITE_TRIGGER,
    ),
    Protect(
        name="protect_mutate_invite",
        operation=Update,
        condition=(
            Q(old__game_id__df=F("new__game_id"))
            | Q(old__spectator__df=F("new__spectator"))
            | Q(old__email__df=F("new__email"))
            | Q(old__created_at__df=F("new__created_at"))
        ),
    ),
)
class Invite(TimestampBase):
    game = models.ForeignKey("api.Game", on_delete=models.CASCADE)
    spectator = models.BooleanField(default=False)
    revoked = models.BooleanField(default=False)
    email = models.EmailField(verbose_name="email")

    objects = models.Manager()

    class Meta:
        constraints = [
            # restrict duplicate invites
            models.UniqueConstraint(
                name="unique_uid_invite_game",
                fields=(
                    "game",
                    "email",
                ),
            ),
        ]

    # Calculated fields
    def is_expired(self):
        """Whether the code is expired."""
        return timezone.now() > self.expires_at
