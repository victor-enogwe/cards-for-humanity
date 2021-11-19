from django.db import models, transaction

from api.models.password import Password
from api.models.profile import Profile
from api.models.provider import Provider


class UserManager(models.Manager):
    """Django manager for user model."""
    use_in_migrations = True

    def set_extras(self, is_superuser=False, **extra_fields):
        extra_fields.setdefault("is_staff", is_superuser)
        extra_fields.setdefault("is_superuser", is_superuser)
        extra_fields.setdefault("is_active", is_superuser)
        return extra_fields

    @transaction.atomic()
    def create_user_base(self, email, password, **extra_fields):
        """Shared method of creating new users."""
        if not email:
            raise ValueError("Email is required for new users")

        email = Provider.normalize_email(email)
        user = self.model.objects.create(**extra_fields)
        provider: Provider = Provider.objects.create(email=email, user=user)
        provider.verification_email()
        raise ValueError('hello world')
        password_instance = Password(user=user, is_active=True)
        password_instance.set_password(password)
        Profile.objects.create(provider=provider)
        password_instance.save(using=self._db)
        return user

    def create_user(self, email: str = None, password: str = None, **extra_fields):
        extra_fields = self.set_extras(False, **extra_fields)
        self.create_user_base(email, password, **extra_fields)

    def create_superuser(self, email: str = None, password: str = None, **extra_fields):
        extra_fields = self.set_extras(True, **extra_fields)
        self.create_user_base(email, password, **extra_fields)
