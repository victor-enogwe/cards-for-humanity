import graphene
from graphene import relay
from graphene_django import DjangoObjectType
from graphene_django_subscriptions.subscription import Subscription
from rest_framework import serializers
from ..models import Player


class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = '__all__' 

    
class PlayerType(DjangoObjectType):
    class Meta:
        model = Player
        interfaces = (relay.Node, )

class PlayerSubscriptionType(Subscription):
    class Meta:
        queryset = None
        serializer_class = PlayerSerializer
        stream = 'players'


class PlayerQuery(graphene.ObjectType):
    all_players = graphene.List(PlayerType)

    def resolve_all_players(self, info, **kwargs):
        return Player.objects.all()


class PlayerMutation(graphene.ObjectType):
    pass


class PlayerSubscription(graphene.ObjectType):
    player_subscription = PlayerSubscriptionType.Field()