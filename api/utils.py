from django.core.validators import MinValueValidator, MaxValueValidator
from rest_meets_djongo.serializers import DjongoModelSerializer
from django.db import models
from django.utils import timezone
from promise import is_thenable


def game_name(variation='for'):
    return 'cards {0} humanity'.format(variation)


def min_max_validator(min, max):
    message = 'value should be >= {0} and <= {1}'.format(min, max)
    return [MinValueValidator(min), MaxValueValidator(max)]



def depromise_subscription(next, root, info, **kwargs):
    result = next(root, info, **kwargs)
    if info.operation.operation == 'subscription' and is_thenable(result):
        return result.get()
    return result

class AutoDateTimeField(models.DateTimeField):
    def pre_save(self, model_instance, add):
        return timezone.now()



# class ModelSerializer(DjongoModelSerializer):
#     class Meta:
#         model = YourModel
#         fields = '__all__'