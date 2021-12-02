import graphene
from graphene_django.filter import DjangoFilterConnectionField

from api.graphql.nodes import GameNode
from api.models.game import Game


class GameQuery(graphene.ObjectType):
    game = graphene.Field(GameNode, id=graphene.ID())
    games = DjangoFilterConnectionField(GameNode, description='find games')

    def resolve_game(self: None, info, **input):
        user = info.context.user
        return Game.objects.filter(**input).first()
