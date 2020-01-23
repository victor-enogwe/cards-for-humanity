from djongo import models
from django.core.validators import RegexValidator, MinLengthValidator
from ..utils import AutoDateTimeField, timezone


text_error_message = "answer allows 2-255 characters(alphabets and -,_,.,',\",space)"
answer_regex = RegexValidator(r'^[A-Za-z]([\w+|-|\s|\'|\"|\.|!]?)+', text_error_message)
text_validators = [MinLengthValidator(5, text_error_message), answer_regex]


class Answer(models.Model):
    _id = models.ObjectIdField()
    text = models.CharField(unique=True, max_length=255, validators=text_validators, help_text=text_error_message)
    created_at = models.DateTimeField(default=timezone.now, editable=False)
    updated_at = AutoDateTimeField(auto_now=True)
    objects = models.DjongoManager()

    def __str__(self):
        return self.text
