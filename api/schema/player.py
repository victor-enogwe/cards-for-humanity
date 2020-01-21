import graphene
from graphene import Schema, relay, resolve_only_args
from graphene_django import DjangoConnectionField, DjangoObjectType
from ..models import Player


class PlayerType(DjangoObjectType):
    class Meta:
        model = Player


class PlayerQuery(graphene.ObjectType):
    all_players = graphene.List(PlayerType)

    def resolve_all_players(self, info, **kwargs):
        return Player.objects.all()


class PlayerMutation(graphene.ObjectType):
    pass
