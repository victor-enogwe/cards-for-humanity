from datetime import datetime

import graphene
from django.db.models.query_utils import Q
from graphene_django.filter import DjangoFilterConnectionField

from api.graphql.nodes import GameNode
from api.models.game import Game
from api.models.player import Player
from api.utils.enums import GameStatus


class GameQuery(graphene.ObjectType):
    game = graphene.Field(GameNode, id=graphene.ID())
    games = DjangoFilterConnectionField(GameNode, description="find games")
    game_in_progress = graphene.Field(GameNode)

    def resolve_game(self: None, info, **input):
        user = info.context.user
        input["creator"] = user
        return Game.objects.filter(**input).first()

    def resolve_game_in_progress(self: None, info):
        try:
            player = Player.objects.filter(
                ~Q(game__status=GameStatus.GE), Q(user=info.context.user)
            ).first()
            if player is None:
                raise Player.DoesNotExist()
            return player.game
        except (
            Player.DoesNotExist,
            Player.game.RelatedObjectDoesNotExist,
        ):
            return Game.objects.filter(
                ~Q(status=GameStatus.GE), Q(creator=info.context.user)
            ).first()
