from django.db import models
from django.core.validators import RegexValidator, MinLengthValidator
from ..utils import AutoDateTimeField, min_max_validator, MinValueValidator, timezone

text_error_message = "description allows 2-255 characters(alphabets and -,_,.,',\",space)"
text_regex = RegexValidator(r'^[A-Za-z]([\w+|-|\s|\'|\"|\.|!]?)+', text_error_message)
text_validators = [MinLengthValidator(5, text_error_message), text_regex]

class Genre(models.Model):
    description = models.CharField(unique=True, max_length=255, validators=text_validators, help_text=text_error_message)
    credit = models.URLField(null=True, blank=True, help_text='credit creator(url)')
    objects = models.Manager()

    def __str__(self):
        return 'Genre {0}'.format(self.description)
