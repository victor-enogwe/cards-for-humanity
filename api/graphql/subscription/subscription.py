from graphene.types.objecttype import ObjectType

from api.graphql.subscription.game import GameSubscription


class Subscription(ObjectType):
    """Root Subscription for the cards against humanity api."""

    """join game"""
    game = GameSubscription.Field()
