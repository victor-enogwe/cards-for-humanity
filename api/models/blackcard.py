from djongo import models
from django.core.validators import RegexValidator, MinLengthValidator
from ..utils import game_name, AutoDateTimeField, timezone

pick = (('1', 'pick1'), ('2', 'pick2'))
text_error_message = "text allows 5-255 characters(alphabets and -,_,?,',\",space)"
text_regex = RegexValidator(r'^[A-Za-z]([\w+|-|\s|\'|\"|\?|!]?)+', text_error_message)
text_validators = [MinLengthValidator(5, text_error_message), text_regex]


class BlackCard(models.Model):
    _id = models.ObjectIdField()
    text = models.CharField(max_length=255, validators=text_validators, help_text=text_error_message)
    genre = models.ForeignKey('api.Genre', on_delete=models.CASCADE)
    pick = models.CharField(max_length=5, choices=pick, default='1')
    created_at = models.DateTimeField(default=timezone.now, editable=False)
    updated_at = AutoDateTimeField(auto_now=True)
    objects = models.DjongoManager()

    class Meta:
        unique_together = ('text', 'genre')
        indexes = (models.Index(fields=('pick',)), )

    def __str__(self):
        return self.text
