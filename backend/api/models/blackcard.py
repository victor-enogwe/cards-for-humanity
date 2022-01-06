from re import findall

from api.models.card_base import CardBase
from api.utils.validators import min_max_validator
from django.core.validators import MinLengthValidator, RegexValidator
from django.db import models
from pgtrigger import Delete, Protect, Update, register

text_error_message = "text allows 5-255 characters(alphabets and -,_,?,',\",space)"
text_regex = RegexValidator(r"^[A-Za-z]([\w+|-|\s|\'|\"|\?|!]?)+", text_error_message)
text_validators = [MinLengthValidator(5, text_error_message), text_regex]


@register(
    Protect(name="protect_update_delete_black_card", operation=Update | Delete),
)
class BlackCard(CardBase):
    pick = models.PositiveSmallIntegerField(
        validators=min_max_validator(1, 3),
        choices=((1, "Pick One"), (2, "Pick Two"), (3, "Pick Three")),
        default=1,
    )

    class Meta:
        indexes = (models.Index(fields=("pick",)),)

    def text_words(self):
        return findall(r"([A-Za-z]+)", self.text)
