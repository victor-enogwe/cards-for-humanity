from django.core.validators import MinLengthValidator, RegexValidator
from django.db import models
from pgtrigger import Delete, F, Protect, Q, Update, register

from api.models.card_base import CardBase
from api.utils.enums import BlackCardPickChoices

text_error_message = "text allows 5-255 characters(alphabets and -,_,?,',\",space)"
text_regex = RegexValidator(r"^[A-Za-z]([\w+|-|\s|\'|\"|\?|!]?)+", text_error_message)
text_validators = [MinLengthValidator(5, text_error_message), text_regex]


@register(
    Protect(name="protect_deletes_black_card", operation=Delete),
    Protect(
        name="protect_fields_black_card",
        operation=Update,
        condition=(
            Q(old__created_at__df=F("new__created_at"))
            | Q(old__text__df=F("new__text"))
            | Q(old__genre_id__df=F("new__genre_id"))
        ),
    ),
)
class BlackCard(CardBase):
    pick = models.CharField(
        max_length=5, choices=BlackCardPickChoices.choices, default="1"
    )

    class Meta:
        indexes = (models.Index(fields=("pick",)),)
