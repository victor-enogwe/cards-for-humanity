from pprint import pprint

from django.conf.global_settings import DEFAULT_HASHING_ALGORITHM
from django.contrib.auth.models import PermissionsMixin
from django.db import models
from django.utils.crypto import salted_hmac
from django.utils.translation import gettext_lazy as _
from pgtrigger import F, Protect, Q, Update, register
from pgtrigger.core import SoftDelete

from api.models.password import Password
from api.models.timestamp import TimestampBase
from api.utils.user_manager import UserManager


@register(
    SoftDelete(name="protect_soft_delete_user", field="is_active", value=False),
    Protect(
        name="protect_mutate_user",
        operation=Update,
        condition=(
            Q(old__created_at__df=F("new__created_at"))
            | Q(old__is_staff__df=F("new__is_staff"))
            | Q(old__is_admin__df=F("new__is_admin"))
            | Q(old__is_superuser__df=F("new__is_superuser"))
        ),
    ),
)
class User(PermissionsMixin, TimestampBase):
    USERNAME_FIELD = "id"
    REQUIRED_FIELDS = []
    is_active = models.BooleanField(_("is active"), default=True, help_text="Active")
    is_staff = models.BooleanField(help_text="Is Staff", default=False)
    is_admin = models.BooleanField(help_text="Is Admin", default=False)
    is_superuser = models.BooleanField(help_text="Is Superuser", default=False)
    objects = UserManager()

    class Meta:
        verbose_name = _("user")
        verbose_name_plural = _("users")

    def __str__(self):
        return str(self.id)

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

    def natural_key(self):
        return (self.id,)

    def _legacy_get_session_auth_hash(self):
        # RemovedInDjango40Warning: pre-Django 3.1 hashes will be invalid.
        password = Password.objects.get(user=self, is_active=True)
        key_salt = "django.contrib.auth.models.AbstractBaseUser.get_session_auth_hash"
        return salted_hmac(key_salt, password.password, algorithm="sha1").hexdigest()

    def get_session_auth_hash(self):
        password = Password.objects.get(user=self, is_active=True)
        """
        Return an HMAC of the password field.
        """
        key_salt = "django.contrib.auth.models.AbstractBaseUser.get_session_auth_hash"
        return salted_hmac(
            key_salt,
            password.password,
            algorithm=DEFAULT_HASHING_ALGORITHM,
        ).hexdigest()
