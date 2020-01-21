from django.contrib.auth import get_user_model
from django.db import models


class Player(models.Model):
    game = models.ForeignKey('api.Game', on_delete=models.CASCADE)
    player = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    score = models.PositiveSmallIntegerField(default=0)
    czar = models.BooleanField(default=False)

    class Meta:
        unique_together = ('game', 'player')

    def __str__(self):
        return 'Player {0}'.format(self.player)
