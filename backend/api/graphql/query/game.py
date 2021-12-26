from datetime import datetime

import graphene
from django.db.models.query_utils import Q
from graphene_django.filter import DjangoFilterConnectionField

from api.graphql.inputs import InvitedGameInput
from api.graphql.nodes import GameNode
from api.models.game import Game
from api.utils.functions import game_in_progress


class GameQuery(graphene.ObjectType):
    invited_game = graphene.Field(GameNode, input=InvitedGameInput(required=True))
    games = DjangoFilterConnectionField(GameNode, description="find games")
    game_in_progress = graphene.Field(GameNode)

    def resolve_invited_game(self: None, info, **kwargs):
        user = info.context.user
        input = kwargs.get('input')
        id = input.get('id')
        email = input.get("email")
        return Game.objects.filter(id=id, invite__email=email).exclude(player_set__user_id=user).first()

    def resolve_game_in_progress(self: None, info):
        return game_in_progress(user=info.context.user)
