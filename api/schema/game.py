import graphene
from graphene import relay
from graphene_django import DjangoObjectType
from channels_graphql_ws import Subscription
from rest_framework import serializers
from api.utils import ExtendedConnection
from api.models import Game
from api.models.serializers import GameSerializer


class GameNode(DjangoObjectType):
    class Meta:
        model = Game
        filter_fields = '__all__'
        interfaces = (relay.Node, )
        connection_class = ExtendedConnection

class GameSubscriptionType(Subscription):
    # Subscription payload.
    event = graphene.String()

    class Meta:
        queryset = None
        serializer_class = GameSerializer
        stream = 'games'

    @staticmethod
    def subscribe(root, info, arg1, arg2):
        """Called when user subscribes."""

        # Return the list of subscription group names.
        return ['group42']

    @staticmethod
    def publish(payload, info, arg1, arg2):
        """Called to notify the client."""

        # Here `payload` contains the `payload` from the `broadcast()`
        # invocation (see below). You can return `MySubscription.SKIP`
        # if you wish to suppress the notification to a particular
        # client. For example, this allows to avoid notifications for
        # the actions made by this particular client.

        return GameSubscriptionType(event='Something has happened!')

    @classmethod
    def subscription_resolver(cls, root, info, **kwargs):
        result = super().subscription_resolver(root, info, **kwargs)
        return result

class GameQuery(graphene.ObjectType):
    game = graphene.Field(GameNode, _id=graphene.ID())

    def resolve_game(self, info, **kwargs):
        _id = kwargs.get('_id')

        return  Game.objects.get(pk=_id) if _id else None


class GameMutation(graphene.ObjectType):
    pass

class GameSubscription(graphene.ObjectType):
    '''Game subscriptions'''
    game_subscription = GameSubscriptionType.Field()
