import graphene
from graphene import relay
from graphene_django import DjangoObjectType
from graphene_django_subscriptions.subscription import Subscription
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
    class Meta:
        queryset = None
        serializer_class = GameSerializer
        stream = 'games'

    @classmethod
    def subscription_resolver(cls, root, info, **kwargs):
        result = super().subscription_resolver(root, info, **kwargs)
        return result

class GameQuery(graphene.ObjectType):
    game = graphene.Field(GameNode, _id=graphene.ID())

    def resolve_game(self, info, **kwargs):
        _id = kwargs.get('_id')

        return  Game.objects.get(pk=_id) if _id else None

    # def resolve_all_games(self, info, **kwargs):
    #     return Game.objects.all()



class GameMutation(graphene.ObjectType):
    pass

class GameSubscription(graphene.ObjectType):
    '''Game subscriptions'''
    game_subscription = GameSubscriptionType.Field()
