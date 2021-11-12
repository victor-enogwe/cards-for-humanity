import unicodedata

from django.conf.global_settings import DEFAULT_HASHING_ALGORITHM
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.models import User as BaseUser
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.db import models
from django.utils.crypto import salted_hmac
from django.utils.translation import gettext_lazy as _
from pgtrigger import Protect, Update, register
from pgtrigger.core import SoftDelete

from api.models.timestamp import TimestampBase
from api.utils.constants import username_help_text, username_unique_error_message
from api.utils.user_manager import UserManager


@register(SoftDelete(name='protect_soft_delete_user', field='is_active', value=False))
@register(Protect(name="protect_mutate_user", operation=Update))
class User(PermissionsMixin, TimestampBase):
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []
    username = models.CharField(
        _('username'),
        max_length=40,
        unique=True,
        help_text=_(username_help_text),
        validators=[UnicodeUsernameValidator()],
        error_messages={
            'unique': _(username_unique_error_message),
        },
    )
    is_active = models.BooleanField(
        _('is active'),
        default=True,
        help_text="Active"
    )
    is_staff = models.BooleanField(help_text="Is Staff", default=False)
    is_admin = models.BooleanField(help_text="Is Admin", default=False)
    is_superuser = models.BooleanField(help_text="Is Superuser", default=False)
    last_login = models.DateTimeField(_('last login'), blank=True, null=True)
    verified_at = models.DateTimeField(
        help_text="Date Verified",
        blank=True,
        default=None,
        null=True
    )
    objects = UserManager()

    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')

    @property
    def date_joined(self):
        return self.created_at

    def __str__(self):
        return self.username

    @property
    def is_anonymous(self):
        """
        Always return False. This is a way of comparing User objects to
        anonymous users.
        """
        return False

    @property
    def is_authenticated(self):
        """
        Always return True. This is a way to tell if the user has been
        authenticated in templates.
        """
        return True

    @property
    def is_verified(self):
        """Whether user is verified."""
        return self.verified_at is not None

    @classmethod
    def normalize_username(cls, username):
        return unicodedata.normalize('NFKC', username) if isinstance(username, str) else username

    def clean(self):
        setattr(
            self,
            'username',
            self.normalize_username(self.get_username())
        )

    def natural_key(self):
        return (self.get_username(),)

    def _legacy_get_session_auth_hash(self):
        # RemovedInDjango40Warning: pre-Django 3.1 hashes will be invalid.
        key_salt = 'django.contrib.auth.models.AbstractBaseUser.get_session_auth_hash'
        return salted_hmac(key_salt, self.password, algorithm='sha1').hexdigest()

    def get_session_auth_hash(self):
        """
        Return an HMAC of the password field.
        """
        key_salt = "django.contrib.auth.models.AbstractBaseUser.get_session_auth_hash"
        return salted_hmac(
            key_salt,
            self.password,
            algorithm=DEFAULT_HASHING_ALGORITHM,
        ).hexdigest()
