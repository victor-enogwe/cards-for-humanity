from django.core.validators import MinLengthValidator, RegexValidator
from django.db import models
from pgtrigger import Delete, F, Protect, Q, Update, register

from ..utils import AutoDateTimeField, timezone

pick = (('1', 'pick1'), ('2', 'pick2'))
text_error_message = "text allows 5-255 characters(alphabets and -,_,?,',\",space)"
text_regex = RegexValidator(
    r'^[A-Za-z]([\w+|-|\s|\'|\"|\?|!]?)+', text_error_message)
text_validators = [MinLengthValidator(5, text_error_message), text_regex]


@register(Protect(name="protect_fields", operation=Update, condition=Q(old__created_at__df=F('new__created_at'))))
@register(Protect(name="protect_deletes", operation=Delete))
class BlackCard(models.Model):
    text = models.CharField(
        max_length=255, validators=text_validators, help_text=text_error_message)
    genre = models.ForeignKey('api.Genre', on_delete=models.CASCADE)
    pick = models.CharField(max_length=5, choices=pick, default='1')
    created_at = models.DateTimeField(default=timezone.now, editable=False)
    updated_at = AutoDateTimeField(auto_now=True, editable=False)
    objects = models.Manager()

    class Meta:
        unique_together = ('text', 'genre')
        indexes = (models.Index(fields=('pick',)), )

    def __str__(self):
        return self.text
