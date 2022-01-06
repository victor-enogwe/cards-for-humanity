from api.models.card_base import CardBase
from pgtrigger import Delete, Protect, Update, register


@register(
    Protect(name="protect_update_delete_white_card", operation=Update | Delete),
)
class WhiteCard(CardBase):
    ...
