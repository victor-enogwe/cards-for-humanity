from django.db import models
from pgtrigger import Delete, Protect, Update, register

from api.utils.constants import text_error_message, text_validators


@register(
    Protect(name="protect_deletes_genre", operation=Delete),
    Protect(name="protect_fields_genre", operation=Update),
)
class Genre(models.Model):
    description = models.CharField(
        unique=True,
        max_length=255,
        validators=text_validators,
        help_text=text_error_message,
    )
    credit = models.URLField(null=True, blank=True, help_text="credit creator(url)")
    objects = models.Manager()

    def __str__(self):
        return "Genre: {0}".format(self.description)
