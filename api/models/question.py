from djongo import models
from django.core.validators import RegexValidator, MinLengthValidator
from ..utils import game_name, AutoDateTimeField, timezone

game_type = (('cfh', game_name()), ('cah', game_name('against')))
text_error_message = "question allows 5-255 characters(alphabets and -,_,?,',\",space)"
question_regex = RegexValidator(r'^[A-Za-z]([\w+|-|\s|\'|\"|\?|!]?)+', text_error_message)
text_validators = [MinLengthValidator(5, text_error_message), question_regex]


class Question(models.Model):
    _id = models.ObjectIdField()
    text = models.CharField(unique=True, max_length=255, validators=text_validators, help_text=text_error_message)
    game_type = models.CharField(max_length=3, choices=game_type, default='cfh')
    card_type = models.CharField(max_length=5, choices=(('1', 'pick1'), ('2', 'pick2')), default='1')
    created_at = models.DateTimeField(default=timezone.now, editable=False)
    updated_at = AutoDateTimeField(auto_now=True)
    objects = models.DjongoManager()

    def __str__(self):
        return self.text
