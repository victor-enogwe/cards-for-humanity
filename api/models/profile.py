from django.db import models

from api.models.timestamp import TimestampBase
from api.utils.enums import Conversion, Gender, Provider
from config.settings import AUTH_USER_MODEL


class Profile(TimestampBase):
    user = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE)
    first_name = models.CharField(help_text="First Name", max_length=50)
    last_name = models.CharField(help_text="Last Name", max_length=50)
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
    conversion_mode = models.CharField(
        help_text="Account Type",
        choices=Conversion.choices,
        default=Conversion.CREATED,
        max_length=10,
        editable=False
    )
    provider = models.CharField(
        help_text="Account Type",
        choices=Provider.choices,
        default=Provider.CAH,
        max_length=10,
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
