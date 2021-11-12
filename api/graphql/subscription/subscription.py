from graphene.types.objecttype import ObjectType

from api.graphql.subscription.join_game import JoinGameSubscription


class Subscription(ObjectType):
    '''Root Subscription for the cards against humanity api.'''
    '''join game'''
    join_game = JoinGameSubscription.Field()
