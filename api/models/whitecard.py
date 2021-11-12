from django.db import models
from django.utils import timezone
from pgtrigger import Delete, F, Protect, Q, Update, register

from api.models.timestamp import TimestampBase
from api.utils.autodatetime import AutoDateTimeField
from api.utils.constants import text_error_message
from api.utils.validators import text_validators


@register(Protect(name="protect_fields_white_card", operation=Update, condition=Q(old__created_at__df=F('new__created_at'))))
@register(Protect(name="protect_deletes_white_card", operation=Delete))
class WhiteCard(TimestampBase):
    text = models.CharField(
        max_length=255,
        validators=text_validators,
        help_text=text_error_message
    )
    genre = models.ForeignKey('api.Genre', on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now, editable=False)
    updated_at = AutoDateTimeField(auto_now=True, editable=False)
    objects = models.Manager()

    class Meta:
        unique_together = ('text', 'genre')

    def __str__(self):
        return self.text
