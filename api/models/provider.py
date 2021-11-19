from django.core.mail import send_mail
from django.db import models
from django.utils.crypto import get_random_string
from django.utils.translation import gettext_lazy as _
from pgtrigger import Protect, Update, register
from phonenumber_field.modelfields import PhoneNumberField

from api.models.timestamp import TimestampBase
from api.models.verification_code import VerificationCode
from api.utils.constants import password_allowed_chars
from api.utils.enums import Conversion
from api.utils.enums import Provider as ProviderEnum
from config.settings import AUTH_USER_MODEL


@register(Protect(
    name="protect_update_email",
    operation=Update
))
class Provider(TimestampBase):
    user = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE)
    last_login = models.DateTimeField(_('last login'), blank=True, null=True)
    primary = models.BooleanField(default=False)
    email = models.EmailField(
        unique=True,
        verbose_name='email',
        blank=True,
        null=True,
        error_messages={'unique': 'A user with that email already exists.'}
    )
    phone = PhoneNumberField(
        unique=True,
        verbose_name='phone',
        blank=True,
        null=True,
        error_messages={
            'unique': 'A user with that phone number already exists.'}
    )
    seed = models.CharField(
        _('token seed'),
        max_length=40,
        blank=True,
        null=True,
        unique=True,
    )
    provider = models.CharField(
        help_text="Account Type",
        choices=ProviderEnum.choices,
        default=ProviderEnum.EMAIL,
        max_length=10,
    )
    conversion_mode = models.CharField(
        help_text="Account Type",
        choices=Conversion.choices,
        default=Conversion.CREATED,
        max_length=10,
        editable=False
    )
    verified_at = models.DateTimeField(
        help_text="Date Verified",
        blank=True,
        default=None,
        null=True
    )
    objects = models.Manager()

    class Meta:
        constraints = [
            models.CheckConstraint(
                name="api_provider_email_or_phone",
                check=(
                    models.Q(email__isnull=False, phone__isnull=True, seed__isnull=True) |
                    models.Q(phone__isnull=False, email__isnull=True) |
                    models.Q(seed__isnull=False, email__isnull=True)
                ),
            )
        ]

    @property
    def date_joined(self):
        return self.created_at

    @property
    def is_verified(self):
        """Whether user is verified."""
        return self.verified_at is not None

    @classmethod
    def normalize_email(cls, email):
        """
        Normalize the email address by lowercasing the domain part of it.
        """
        email = email or ''
        try:
            email_name, domain_part = email.strip().rsplit('@', 1)
        except ValueError:
            pass
        else:
            email = email_name + '@' + domain_part.lower()
        return email

    def clean(self):
        super().clean()
        self.email = self.__class__.objects.normalize_email(self.email)

    def email_user(self, subject, message, from_email=None, **kwargs):
        """Send an email to this user."""
        send_mail(subject, message, from_email, [self.email], **kwargs)

    def __str__(self):
        return self.email or self.phone
