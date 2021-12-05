from django.db import models
from pgtrigger import Delete, F, Protect, Q, Update, register

from api.models.card_base import CardBase


@register(
    Protect(name="protect_deletes_white_card", operation=Delete),
    Protect(
        name="protect_fields_white_card",
        operation=Update,
        condition=(
            Q(old__created_at__df=F("new__created_at"))
            | Q(old__text__df=F("new__text"))
            | Q(old__genre_id__df=F("new__genre_id"))
        ),
    ),
)
class WhiteCard(CardBase):
    ...
