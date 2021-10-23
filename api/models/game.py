from django.db import models
from django.db.models.enums import TextChoices

from ..utils import AutoDateTimeField, MinValueValidator, min_max_validator, timezone


class GameStatus(models.TextChoices):
    GAP = 'Awaiting Players'
    GAC = 'Awaiting Czar'
    GS = 'Game Started'
    GE = 'Game Ended'


class Game(models.Model):
    genres = models.ManyToManyField('api.Genre')
    round_time = models.SmallIntegerField(
        default=10, validators=min_max_validator(10, 60), help_text='seconds')
    rounds = models.SmallIntegerField(
        default=5, validators=min_max_validator(5, 50), help_text='no of game rounds', editable=False)
    num_players = models.PositiveSmallIntegerField(
        validators=min_max_validator(1, 10), help_text='no of players')
    num_spectators = models.PositiveSmallIntegerField(
        validators=min_max_validator(1, 10), help_text='no of spectators', editable=False)
    status = models.CharField(
        max_length=3, choices=TextChoices.choices, default='GAP')
    created_at = models.DateTimeField(default=timezone.now, editable=False)
    updated_at = AutoDateTimeField(auto_now=True, editable=False)
    objects = models.Manager()

    def __str__(self):
        return 'Game {0}'.format(self.id)
