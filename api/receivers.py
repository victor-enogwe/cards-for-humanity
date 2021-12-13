from django.contrib.auth import (
    authenticate,
    get_user_model,
    user_logged_in,
    user_logged_out,
    user_login_failed,
)
from django.contrib.auth.signals import user_logged_in
from django.db.models.base import Model
from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from django.utils import timezone
from graphql_jwt.refresh_token.signals import refresh_token_rotated

from api.graphql.subscription.game_in_progress import GameInProgressSubscription
from api.models.game import Game
from api.models.profile import Profile
from api.models.user import User
from api.models.verification_code import VerificationCode


@receiver(refresh_token_rotated)
def revoke_refresh_token(sender, request, refresh_token, **kwargs):
    refresh_token.revoke(request)


@receiver(pre_save)
def updated_at_timestamp(sender, instance: Model, **kwargs):
    setattr(instance, "updated_at", timezone.now())


@receiver(pre_save, sender=VerificationCode)
def updated_at_timestamp(sender, instance: VerificationCode, **kwargs):
    default_expiry = timezone.now() + timezone.timedelta(minutes=5)
    print(instance.previous)
    setattr(instance, "expires_at", default_expiry)


@receiver(post_save, sender=Game)
def broadcast_game(sender, instance, **kwargs):
    GameInProgressSubscription.on_game_updated(gameInProgress=instance)

    # @receiver(post_save, sender=User)
    # def create_user_profile(sender, instance, created, **kwargs):
    #     print(created, kwargs)
    # if created:
    #     Profile.objects.create(user=instance)


@receiver(user_logged_in)
def after_user_logged_in(sender, user, request, **kwargs):
    print(user, "last login")
    # user.last_login = timezone.now()
    # user.save()


# @receiver(post_save, sender=User)
# def save_user_profile(sender, instance, **kwargs):
#     instance.profile.save()
