import graphene
from graphene import relay
from graphene_django import DjangoObjectType
from graphene_django_subscriptions.subscription import Subscription
from rest_framework import serializers
from ..models import Game

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = '__all__' 

class GameType(DjangoObjectType):
    class Meta:
        model = Game
        interfaces = (relay.Node, )

class GameSubscriptionType(Subscription):
    class Meta:
        queryset = None
        serializer_class = GameSerializer
        stream = 'games'

    @classmethod
    def subscription_resolver(cls, root, info, **kwargs):
        result = super().subscription_resolver(root, info, **kwargs)
        #from rx import Observable
        #result = Observable.from_iterable([result])
        return result

class GameQuery(graphene.ObjectType):
    game = graphene.Field(GameType, _id=graphene.UUID())
    # all_games = graphene.List(GameType)

    def resolve_game(self, info, **kwargs):
        _id = kwargs.get('_id')
        print(_id)

        return  Game.objects.get(pk=_id) if _id else None

    # def resolve_all_games(self, info, **kwargs):
    #     return Game.objects.all()



class GameMutation(graphene.ObjectType):
    pass

class GameSubscription(graphene.ObjectType):
    game_subscription = GameSubscriptionType.Field()
