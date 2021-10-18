import graphene
from channels_graphql_ws import Subscription
from graphene import relay
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from rest_framework import serializers

from api.models import Player
from api.models.serializers import PlayerSerializer
from api.utils import ExtendedConnection


class PlayerNode(DjangoObjectType):
    class Meta:
        model = Player
        filter_fields = '__all__'
        interfaces = (relay.Node, )
        connection_class = ExtendedConnection


class PlayerSubscriptionNode(Subscription):
    class Meta:
        queryset = None
        serializer_class = PlayerSerializer
        stream = 'players'

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

        return PlayerSubscriptionType(event='Something has happened!')


class PlayerQuery(graphene.ObjectType):
    # all_players = DjangoFilterConnectionField(PlayerNode)
    pass


class PlayerMutation(graphene.ObjectType):
    pass


class PlayerSubscription(graphene.ObjectType):
    player_subscription = PlayerSubscriptionNode.Field()
