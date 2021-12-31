from api.models.timestamp import TimestampBase
from api.utils.validators import min_max_validator
from django.db import models
from pgtrigger import Protect, Update, register
from pgtrigger.core import Delete


@register(
    Protect(name="protect_fields_available_question", operation=Update | Delete),
)
class AvailableQuestion(TimestampBase):
    game = models.ForeignKey("api.Game", on_delete=models.CASCADE)
    card = models.ForeignKey("api.BlackCard", on_delete=models.CASCADE)
    round = models.SmallIntegerField(
        default=0,
        validators=min_max_validator(1, 50),
        help_text="game round",
        editable=False,
    )
    objects = models.Manager()

    def __str__(self):
        return "{0}: {1}".format(self.Meta.__name__, self.card.text)

    class Meta:
        constraints = [
            # restrict duplicate question
            models.UniqueConstraint(
                name="unique_available_question_player_game_round",
                fields=(
                    "game",
                    "card",
                    "round",
                ),
            ),
        ]
