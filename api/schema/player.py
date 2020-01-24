import graphene
from graphene import relay
from graphene_django.filter import DjangoFilterConnectionField
from graphene_django import DjangoObjectType
from graphene_django_subscriptions.subscription import Subscription
from rest_framework import serializers
from api.utils import ExtendedConnection
from api.models import Player
from api.models.serializers import PlayerSerializer

    
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


class PlayerQuery(graphene.ObjectType):
    all_players = DjangoFilterConnectionField(PlayerNode)


class PlayerMutation(graphene.ObjectType):
    pass


class PlayerSubscription(graphene.ObjectType):
    player_subscription = PlayerSubscriptionNode.Field()