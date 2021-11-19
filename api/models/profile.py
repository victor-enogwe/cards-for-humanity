from django.contrib.auth.validators import UnicodeUsernameValidator
from django.db import models
from django.utils.translation import gettext_lazy as _

from api.models.timestamp import TimestampBase
from api.utils.constants import username_help_text
from api.utils.enums import Gender


class Profile(TimestampBase):
    provider = models.ForeignKey('api.Provider', on_delete=models.CASCADE)
    first_name = models.CharField(help_text="First Name", max_length=50)
    last_name = models.CharField(help_text="Last Name", max_length=50)
    username = models.CharField(
        _('username'),
        max_length=40,
        help_text=_(username_help_text),
        validators=[UnicodeUsernameValidator()],
    )
    gender = models.CharField(
        max_length=6,
        choices=Gender.choices,
        null=True,
        blank=True,
        help_text='Gender'
    )
    date_of_birth = models.DateField(
        help_text="Birth Date",
        blank=True,
        null=True
    )

    @property
    def full_name(self):
        """
        Return the first_name plus the last_name, with a space in between.
        """
        return ("%s %s" % (self.first_name, self.last_name)).strip()

    @property
    def short_name(self):
        """Return the short name for the user."""
        return self.first_name
