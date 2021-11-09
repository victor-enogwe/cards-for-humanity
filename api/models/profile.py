from django.db import models
from django.db.models.enums import TextChoices

from api.models.user import User


class ProfileRoles(TextChoices):
    MANAGER = 'manager'
    USER = 'user'


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(
        max_length=12, choices=ProfileRoles.choices, default="MANAGER")
