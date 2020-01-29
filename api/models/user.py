from django.contrib.auth.models import AbstractUser
from djongo import models


class User(AbstractUser):
    _id = models.ObjectIdField()
    email = models.EmailField(unique=True, error_messages={ 'unique': 'A user with that email already exists.' },)