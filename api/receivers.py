from django.contrib.auth import user_logged_in
from django.contrib.auth.signals import user_logged_in
from django.db.models.base import Model
from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from django.utils import timezone
from graphql_jwt.refresh_token.signals import refresh_token_rotated

from api.graphql.subscription.game_in_progress import GameInProgressSubscription
from api.models.game import Game
from api.models.provider import Provider
from api.models.verification_code import VerificationCode


# one time use refresh token
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


@receiver(user_logged_in)
def after_user_logged_in(sender, user, request, **kwargs):
    Provider.objects.filter(email=kwargs.get("email"), user=user).update(
        last_login=timezone.now()
    )
