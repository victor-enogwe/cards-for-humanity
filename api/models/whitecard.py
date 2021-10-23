from django.db import models
from django.core.validators import RegexValidator, MinLengthValidator
from ..utils import AutoDateTimeField, timezone


text_error_message = "text allows 2-255 characters(alphabets and -,_,.,',\",space)"
text_regex = RegexValidator(r'^[A-Za-z]([\w+|-|\s|\'|\"|\.|!]?)+', text_error_message)
text_validators = [MinLengthValidator(5, text_error_message), text_regex]


class WhiteCard(models.Model):
    text = models.CharField(max_length=255, validators=text_validators, help_text=text_error_message)
    genre = models.ForeignKey('api.Genre', on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now, editable=False)
    updated_at = AutoDateTimeField(auto_now=True, editable=False)
    objects = models.Manager()

    class Meta:
        unique_together = ('text', 'genre')

    def __str__(self):
        return self.text
