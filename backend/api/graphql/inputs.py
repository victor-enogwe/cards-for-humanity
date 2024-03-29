import graphene
from api.utils.enums import CardRating
from graphene.types import InputObjectType
from graphene.types.scalars import ID, Boolean, Int, String
from graphene.types.structures import List


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


class RoundQuestionMutationInput(InputObjectType):
    player = ID(required=True)
    game = ID(required=True)
    card = ID(required=True)
    round = Int(required=True)
    rating = CardRating(required=True)


class RoundCardInput(InputObjectType):
    id = ID(required=True)
    rating = CardRating(required=True)


class RoundPlayerAnswersMutationInput(InputObjectType):
    question = ID(required=True)
    player = ID(required=True)
    game = ID(required=True)
    cards = List(RoundCardInput, required=True)
    round = Int(required=True)


class RoundCzarAnswersMutationInput(InputObjectType):
    cards = List(RoundCardInput, required=True)


class ChatInput(InputObjectType):
    room = graphene.ID(required=True)
    sender = graphene.ID(required=True)
    message = graphene.String(required=True)
