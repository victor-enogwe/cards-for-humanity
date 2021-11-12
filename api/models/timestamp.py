from django.db import models
from django.utils import timezone

from api.utils.autodatetime import AutoDateTimeField


class TimestampBase(models.Model):
    """Abstract model to represent creation and update times."""

    class Meta:
        """Timestamp model meta information."""
        abstract = True

    # Fields
    created_at = models.DateTimeField(default=timezone.now, editable=False)
    updated_at = AutoDateTimeField(auto_now=True, editable=False)
