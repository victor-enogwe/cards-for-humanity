from uuid import uuid4

from django.core.validators import MinValueValidator
from django.db import models
from django.utils import timezone
from pgtrigger import Protect, Update, register

from api.models.timestamp import TimestampBase
from api.utils.functions import expiry_date_min
from config.settings import AUTH_USER_MODEL


@register(Protect(name="protect_mutate_invite", operation=Update))
class Invite(TimestampBase):
    game = models.ForeignKey("api.Game", on_delete=models.CASCADE)
    user = models.ForeignKey(
        AUTH_USER_MODEL,
        editable=False,
        on_delete=models.CASCADE,
    )
    expires_at = models.DateTimeField(
        validators=[MinValueValidator(limit_value=expiry_date_min)],
        help_text="invite expiry datetime",
        editable=False,
    )

    class Meta:
        constraints = [
            # restrict duplicate invites
            models.UniqueConstraint(
                name="unique_user_invite_game",
                fields=(
                    "game",
                    "user",
                ),
            ),
        ]

    # Calculated fields
    def is_expired(self):
        """Whether the code is expired."""
        return timezone.now() > self.expires_at
