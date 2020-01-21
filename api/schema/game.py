import graphene
from graphene import Schema, relay, resolve_only_args
from graphene_django import DjangoConnectionField, DjangoObjectType
from ..models import Game


class GameType(DjangoObjectType):
    class Meta:
        model = Game


class GameQuery(graphene.ObjectType):
    all_games = graphene.List(GameType)

    def resolve_all_games(self, info, **kwargs):
        return Game.objects.all()


class GameMutation(graphene.ObjectType):
    pass
