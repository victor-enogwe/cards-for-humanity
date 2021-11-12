from graphene.types import InputObjectType
from graphene.types.scalars import ID


class JoinGameInput(InputObjectType):
    player_id = ID(required=True)
    game_id = ID(required=True)
