from graphene.types import InputObjectType
from graphene.types.scalars import ID, Boolean, Int, String


class FilterInput(InputObjectType):
    offset = Int()
    before = String()
    after = String()
    first = Int()
    last = Int()


class JoinGameMutationInput(InputObjectType):
    game = ID(required=True)
    avatar = String(required=True)
    spectator = Boolean(required=False)


class CreateUserMutationInput(InputObjectType):
    email = String(required=True)
    password = String(required=True)


class InviteFilertInput(FilterInput):
    email = String(required=True)
    revoked = Boolean()


class InvitedGameInput(InputObjectType):
    id = ID(required=True)
    email = String(required=True)


class NotificationsInput(InputObjectType):
    invite_input = InviteFilertInput(required=True)
