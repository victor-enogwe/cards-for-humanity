from django.contrib.auth.models import AbstractUser
from django.core.validators import MinLengthValidator, RegexValidator
from django.db import models

password_error_message = "text allows 5-255 characters(alphabets and -,_,?,',\",space)"
password_regex = RegexValidator(
    r'^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$',
    password_error_message
)
password_validators = [MinLengthValidator(
    5, password_error_message), password_regex]


class User(AbstractUser):
    email = models.EmailField(unique=True, error_messages={
                              'unique': 'A user with that email already exists.'},)
    password = models.CharField(max_length=128, verbose_name='password',
                                validators=password_validators, help_text=password_error_message)
