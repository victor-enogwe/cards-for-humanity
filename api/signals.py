from django.db.models.signals import post_save
from django.dispatch import receiver
from graphql_jwt.refresh_token.signals import refresh_token_rotated

from api.models.profile import Profile
from api.models.user import User

@receiver(refresh_token_rotated)
def revoke_refresh_token(sender, request, refresh_token, **kwargs):
    refresh_token.revoke(request)


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()
