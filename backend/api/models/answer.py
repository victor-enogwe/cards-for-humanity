from api.models.timestamp import TimestampBase
from api.utils.enums import CardRating
from api.utils.validators import min_max_validator
from django.db import models
from pgtrigger import Protect, Update, register
from pgtrigger.core import Delete, F, Q


@register(
    Protect(name="protect_delete_answer", operation=Delete),
    Protect(
        name="protect_update_fields_answer",
        operation=Update,
        condition=(
            Q(old__player_id__df=F("new__player_id"))
            | Q(old__game_id__df=F("new__game_id"))
            | Q(old__question_id__df=F("new__question_id"))
            | Q(old__card_id__df=F("new__card_id"))
            | Q(old__round__df=F("new__round"))
            | Q(old__created_at__df=F("new__created_at"))
        ),
    ),
)
class Answer(TimestampBase):
    player = models.ForeignKey("api.Player", on_delete=models.CASCADE)
    game = models.ForeignKey("api.Game", on_delete=models.CASCADE)
    question = models.ForeignKey("api.BlackCard", on_delete=models.CASCADE)
    card = models.ForeignKey("api.WhiteCard", on_delete=models.CASCADE)
    rating = models.CharField(
        max_length=6, choices=CardRating.choices(), default=CardRating.NORMAL._value_
    )
    round = models.PositiveSmallIntegerField(
        default=0,
        validators=min_max_validator(1, 50),
        help_text="game round",
        editable=False,
    )
    selected = models.BooleanField(default=False)
    objects = models.Manager()

    def __str__(self):
        return "{0}: {1}".format(self.Meta.__name__, self.card.text)

    class Meta:
        constraints = [
            # restrict duplicate answer
            models.UniqueConstraint(
                name="unique_answer_player_game_round",
                fields=(
                    "game",
                    "card",
                    "round",
                ),
            ),
        ]
