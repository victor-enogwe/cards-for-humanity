from django.db import models
from .question import game_type
from ..utils import min_max_validator, MinValueValidator


game_status = (
    ('GAP', 'Awaiting Players'),
    ('GAC', 'Awaiting Czar'),
    ('GS', 'Game Started'),
    ('GE', 'Game Ended')
)


class Game(models.Model):
    game_type = models.CharField(max_length=3, choices=game_type, default='cfh')
    round_time = models.SmallIntegerField(default=10, validators=min_max_validator(10, 60), help_text='seconds')
    rounds = models.SmallIntegerField(default=1, validators=min_max_validator(-1, 5))
    num_players = models.PositiveSmallIntegerField(validators=min_max_validator(3, 8))
    status = models.CharField(max_length=3, choices=game_status, default='GAP')

    def __str__(self):
        return 'Game {0}'.format(self.id)
