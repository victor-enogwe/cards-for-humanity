from graphene.types import InputObjectType
from graphene.types.scalars import ID, Boolean, String


class JoinGameMutationInput(InputObjectType):
    game = ID(required=True)
    avatar = String(required=True)
    spectator = Boolean(required=False)


class CreateUserMutationInput(InputObjectType):
    email = String(required=True)
    password = String(required=True)
