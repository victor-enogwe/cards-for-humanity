from api.graphql.subscription.game_in_progress import GameInProgressSubscription
from api.graphql.subscription.notification import NotificationSubscription
from api.models.answer import Answer
from api.models.available_answer import AvailableAnswer
from api.models.available_question import AvailableQuestion
from api.models.game import Game
from api.models.invite import Invite
from api.models.password import Password
from api.models.player import Player
from api.models.provider import Provider
from api.models.question import Question
from api.models.user import User
from api.models.verification_code import VerificationCode
from api.utils.functions import get_invites
from django.contrib.auth.signals import user_logged_in
from django.db.models.base import Model
from django.db.models.signals import post_delete, post_save, pre_save
from django.dispatch import receiver
from django.utils import timezone
from graphql_jwt.refresh_token.signals import refresh_token_rotated


# one time use refresh token
@receiver(refresh_token_rotated)
def revoke_refresh_token(sender, request, refresh_token, **kwargs):
    refresh_token.revoke(request)


@receiver(pre_save, sender=Question)
@receiver(pre_save, sender=Answer)
@receiver(pre_save, sender=Game)
@receiver(pre_save, sender=Player)
@receiver(pre_save, sender=Invite)
@receiver(pre_save, sender=User)
@receiver(pre_save, sender=Password)
@receiver(pre_save, sender=Provider)
def update_edit_timestamp(sender, instance: Model, **kwargs):
    setattr(instance, "updated_at", timezone.now())


@receiver(pre_save, sender=VerificationCode)
def update_expiry(sender, instance: VerificationCode, **kwargs):
    default_expiry = timezone.now() + timezone.timedelta(minutes=5)
    setattr(instance, "expires_at", default_expiry)
    instance.save()


@receiver(post_save, sender=Game)
def broadcast_game(sender, instance, created, **kwargs):
    GameInProgressSubscription.on_game_updated(game_in_progress=instance)


@receiver([post_save, post_delete], sender=Invite)
def broadcast_invite(sender, instance, **kwargs):
    try:
        GameInProgressSubscription.on_game_updated(game_in_progress=instance.game)
        email = instance.email
        user = Provider.objects.get(email=email).user
        notifications = {
            "id": user.id,
            "invites": list(
                get_invites(user=user, email=email, first=10, revoked=False).values()
            ),
        }

        NotificationSubscription.on_new_notification(notifications=notifications)
    except Provider.DoesNotExist:
        ...


@receiver([post_save, post_delete], sender=AvailableQuestion)
@receiver([post_save, post_delete], sender=AvailableAnswer)
@receiver([post_save, post_delete], sender=Question)
@receiver([post_save, post_delete], sender=Answer)
@receiver([post_save, post_delete], sender=Player)
def broadcast_question_answer(sender, instance, **kwargs):
    GameInProgressSubscription.on_game_updated(game_in_progress=instance.game)


@receiver(user_logged_in)
def after_user_logged_in(sender, user, request, **kwargs):
    Provider.objects.filter(email=kwargs.get("email"), user=user).update(
        last_login=timezone.now()
    )
