from django.db import models


class Question(models.Model):
    text = models.CharField(max_length=255)
    hint = models.CharField(max_length=100)
