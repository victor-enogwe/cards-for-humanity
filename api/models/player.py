from django.db import models
from pgtrigger import F, Protect, Q, Update, register

from api.models.timestamp import TimestampBase
from config.settings import AUTH_USER_MODEL


@register(Protect(
    name="protect_fields_player",
    operation=Update,
    condition=(
        Q(old__created_at__df=F('new__created_at')) |
        Q(old__game_id__df=F('new__game_id')) |
        Q(old__user_id__df=F('new__user_id'))
    )
))
class Player(TimestampBase):
    game = models.ForeignKey('api.Game', on_delete=models.CASCADE)
    user = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE)
    score = models.PositiveSmallIntegerField(default=0)
    czar = models.BooleanField(default=False)
    objects = models.Manager()

    class Meta:
        unique_together = ('game', 'user')

    def __str__(self):
        return 'Player: {0}'.format(self.user.id)

    class Meta:
        indexes = (models.Index(fields=('czar',)),
                   models.Index(fields=('score',)),)
