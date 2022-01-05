from api.graphql.subscription.chat import ChatSubscription
from api.graphql.subscription.game_in_progress import GameInProgressSubscription
from api.graphql.subscription.notification import NotificationSubscription
from graphene.types.objecttype import ObjectType


class Subscription(ObjectType):
    """Root Subscription for the cards for humanity api."""

    chat = ChatSubscription.Field()
    game_in_progress = GameInProgressSubscription.Field()
    notifications = NotificationSubscription.Field()
