from django.contrib.auth.hashers import check_password, is_password_usable, make_password
from django.contrib.auth.models import AbstractBaseUser
from django.core.exceptions import ValidationError
from django.db import models
from pgtrigger import Protect, Update, register
from pgtrigger.core import SoftDelete

from api.models.timestamp import TimestampBase
from api.utils.constants import password_allowed_chars, password_error_message
from api.utils.enums import PasswordErrors
from api.utils.validators import password_validators
from config.settings import AUTH_USER_MODEL


@register(Protect(name="protect_update_password", operation=Update))
@register(SoftDelete(name='protect_soft_delete_password', field='is_active', value=False))
class Password(TimestampBase):
    user = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=False)
    password = models.CharField(
        max_length=128,
        verbose_name='password',
        validators=password_validators,
        unique=True,
        error_messages={'unique': 'You already used this password.'},
        help_text=password_error_message
    )
    objects = models.Manager()

    def make_random_password(self, length=10, allowed_chars=password_allowed_chars):
        """
        Generate a random password with the given length and given
        allowed_chars. The default value of allowed_chars does not have "I" or
        "O" or letters and digits that look similar -- just to avoid confusion.
        """
        return AbstractBaseUser

    def set_password(self, raw_password=None):
        if raw_password is None:
            raise ValidationError(PasswordErrors.PASSWORD_WEAK)

        # Cannot change password to original value
        if super().check_password(raw_password):
            raise ValidationError(PasswordErrors.PASSWORD_SAME)

        self.password = make_password(raw_password)
        self._password = raw_password

    def check_password(self, raw_password):
        """
        Return a boolean of whether the raw_password was correct. Handles
        hashing formats behind the scenes.
        """
        def setter(raw_password):
            self.set_password(raw_password)
            # Password hash upgrades shouldn't be considered password changes.
            self._password = None
            self.save(update_fields=["password"])
        return check_password(raw_password, self.password, setter)

    def set_unusable_password(self):
        # Set a value that will never be a valid hash
        self.password = make_password(None)

    def has_usable_password(self):
        """
        Return False if set_unusable_password() has been called for this user.
        """
        return is_password_usable(self.password)
