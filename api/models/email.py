from django.core.mail import send_mail
from django.db import models
from pgtrigger import Protect, Update, register

from api.models.timestamp import TimestampBase
from api.utils.enums import Provider
from config.settings import AUTH_USER_MODEL


@register(Protect(name="protect_update_email", operation=Update))
class Email(TimestampBase):
    user = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE)
    primary = models.BooleanField(default=False)
    email = models.EmailField(
        unique=True,
        error_messages={'unique': 'A user with that email already exists.'}
    )
    provider = models.CharField(
        help_text="Account Type",
        choices=Provider.choices,
        default=Provider.CAH,
        max_length=10,
    )
    objects = models.Manager()

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
