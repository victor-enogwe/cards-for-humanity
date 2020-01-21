from django.core.validators import MinValueValidator, MaxValueValidator


def game_name(variation='for'):
    return 'cards {0} humanity'.format(variation)


def min_max_validator(min, max):
    message = 'value should be >= {0} and <= {1}'.format(min, max)
    return [MinValueValidator(min), MaxValueValidator(max)]
