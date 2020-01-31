from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from graphene import Int, relay
from django.utils import timezone


def game_name(variation='for'):
    return 'cards {0} humanity'.format(variation)


def min_max_validator(min, max):
    message = 'value should be >= {0} and <= {1}'.format(min, max)
    return [MinValueValidator(min), MaxValueValidator(max)]

class AutoDateTimeField(models.DateTimeField):
    def pre_save(self, model_instance, add):
        return timezone.now()


class ExtendedConnection(relay.Connection):
    class Meta:
        abstract = True

    total_count = Int()
    edge_count = Int()

    def resolve_total_count(root, info, **kwargs):
        return root.length
    def resolve_edge_count(root, info, **kwargs):
        return len(root.edges)
