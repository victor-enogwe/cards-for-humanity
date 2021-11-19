from django.db import models

from api.models.timestamp import TimestampBase
from api.utils.constants import text_error_message
from api.utils.enums import CardRating
from api.utils.validators import text_validators


class CardBase(TimestampBase):
    text = models.CharField(
        max_length=255,
        validators=text_validators,
        help_text=text_error_message
    )
    rating = models.CharField(
        max_length=10,
        choices=CardRating.choices,
        default=CardRating.NORMAL
    )
    genre = models.ForeignKey('api.Genre', on_delete=models.CASCADE)
    objects = models.Manager()

    class Meta:
        """Timestamp model meta information."""
        unique_together = ('text', 'genre')
        ordering = ['text']
        abstract = True

    def __str__(self):
        return self.text
