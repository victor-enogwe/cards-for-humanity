from djongo import models
from config.settings import AUTH_USER_MODEL
from ..utils import AutoDateTimeField, timezone


class Player(models.Model):
    _id = models.ObjectIdField()
    game = models.ForeignKey('api.Game', on_delete=models.CASCADE)
    user = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE)
    score = models.PositiveSmallIntegerField(default=0)
    czar = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now, editable=False)
    updated_at = AutoDateTimeField(auto_now=True)
    objects = models.DjongoManager()

    class Meta:
        unique_together = ('game', 'user')

    def __str__(self):
        return 'Player {0}'.format(self.user)

    class Meta:
        indexes = (models.Index(fields=('czar',)), models.Index(fields=('score',)),)
