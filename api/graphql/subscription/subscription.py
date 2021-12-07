from graphene.types.objecttype import ObjectType

from api.graphql.subscription.connect import ConnectSubscription
from api.graphql.subscription.game_in_progress import GameInProgressSubscription


class Subscription(ObjectType):
    """Root Subscription for the cards against humanity api."""

    connect = ConnectSubscription.Field()
    """join game in progress"""
    game_in_progress = GameInProgressSubscription.Field()
