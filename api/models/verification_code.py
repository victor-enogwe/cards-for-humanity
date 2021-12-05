from uuid import uuid4

from django.core.validators import MinValueValidator
from django.db import models
from django.utils import timezone
from pgtrigger import Protect, Update, register

from api.models.timestamp import TimestampBase
from api.utils.functions import expiry_date_min


@register(Protect(name="protect_mutate_code", operation=Update))
class VerificationCode(TimestampBase):
    code = models.UUIDField(
        default=uuid4, help_text="verification code", unique=True, editable=False
    )
    previous = models.ForeignKey(
        "self",
        editable=False,
        blank=True,
        null=True,
        on_delete=models.DO_NOTHING,
    )
    provider = models.ForeignKey(
        "api.Provider",
        editable=False,
        on_delete=models.CASCADE,
    )
    expires_at = models.DateTimeField(
        validators=[MinValueValidator(limit_value=expiry_date_min)],
        help_text="code expiry datetime",
        editable=False,
    )

    # Calculated fields
    def is_expired(self):
        """Whether the code is expired."""
        return timezone.now() > self.expires_at
