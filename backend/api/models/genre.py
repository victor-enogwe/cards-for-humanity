from api.utils.constants import text_error_message, text_validators
from django.db import models
from pgtrigger import Delete, Protect, Update, register


@register(
    Protect(name="protect_update_delete_genre", operation=Update | Delete),
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
