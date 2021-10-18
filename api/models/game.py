from django.db import models
from ..utils import AutoDateTimeField, min_max_validator, MinValueValidator, timezone


game_status = (
    ('GAP', 'Awaiting Players'),
    ('GAC', 'Awaiting Czar'),
    ('GS', 'Game Started'),
    ('GE', 'Game Ended')
)


class Game(models.Model):
    genre = models.ForeignKey('api.Genre', on_delete=models.CASCADE)
    round_time = models.SmallIntegerField(
        default=10, validators=min_max_validator(10, 60), help_text='seconds')
    rounds = models.SmallIntegerField(
        default=1, validators=min_max_validator(-1, 5))
    num_players = models.PositiveSmallIntegerField(
        validators=min_max_validator(3, 8))
    status = models.CharField(max_length=3, choices=game_status, default='GAP')
    created_at = models.DateTimeField(default=timezone.now, editable=False)
    updated_at = AutoDateTimeField(auto_now=True)
    objects = models.Manager()

    def __str__(self):
        return 'Game {0}'.format(self.id)
