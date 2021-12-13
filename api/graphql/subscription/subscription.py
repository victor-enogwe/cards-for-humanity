from graphene.types.objecttype import ObjectType

from api.graphql.subscription.game_in_progress import GameInProgressSubscription
from api.graphql.subscription.notification import NotificationSubscription


class Subscription(ObjectType):
    """Root Subscription for the cards against humanity api."""

    "join a notification channel"
    notifications = NotificationSubscription.Field()
    """join game in progress"""
    game_in_progress = GameInProgressSubscription.Field()
