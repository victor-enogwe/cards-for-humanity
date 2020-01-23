from django.contrib.auth import get_user_model
from djongo import models
from ..utils import AutoDateTimeField, timezone


class Player(models.Model):
    _id = models.ObjectIdField()
    game = models.ForeignKey('api.Game', on_delete=models.CASCADE)
    player = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    score = models.PositiveSmallIntegerField(default=0)
    czar = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now, editable=False)
    updated_at = AutoDateTimeField(auto_now=True)
    objects = models.DjongoManager()

    class Meta:
        unique_together = ('game', 'player')

    def __str__(self):
        return 'Player {0}'.format(self.player)
