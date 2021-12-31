from api.models.timestamp import TimestampBase
from api.utils.constants import text_error_message
from api.utils.enums import CardRating
from api.utils.validators import text_validators
from django.db import models


class CardBase(TimestampBase):
    text = models.CharField(
        max_length=255, validators=text_validators, help_text=text_error_message
    )
    genre = models.ForeignKey("api.Genre", on_delete=models.CASCADE)
    objects = models.Manager()

    class Meta:
        """Timestamp model meta information."""

        unique_together = ("text", "genre")
        ordering = ["text"]
        abstract = True

    def __str__(self):
        return self.text

    @property
    def rating(self):
        return CardRating.NORMAL
