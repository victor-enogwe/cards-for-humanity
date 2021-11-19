from graphene.types import InputObjectType
from graphene.types.scalars import ID, String


class JoinGameMutationInput(InputObjectType):
    player_id = ID(required=True)
    game_id = ID(required=True)


class CreateUserMutationInput(InputObjectType):
    email = String(required=True)
    password = String(required=True)
