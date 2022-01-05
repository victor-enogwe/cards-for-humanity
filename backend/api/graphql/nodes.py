from datetime import timedelta
from math import floor

import graphene
from api.graphql.filtersets import InvitesFilter
from api.models.answer import Answer
from api.models.available_answer import AvailableAnswer
from api.models.available_question import AvailableQuestion
from api.models.blackcard import BlackCard
from api.models.game import Game
from api.models.genre import Genre
from api.models.invite import Invite
from api.models.player import Player
from api.models.profile import Profile
from api.models.provider import Provider
from api.models.question import Question
from api.models.whitecard import WhiteCard
from api.utils.enums import CardRating, GameStatus
from api.utils.extended_connection import ExtendedConnection
from api.utils.functions import get_invites
from api.utils.graphql_errors import GraphQLErrors
from django.contrib.auth import get_user_model
from graphene import relay
from graphene_django import DjangoObjectType
from graphene_django.filter.fields import DjangoFilterConnectionField
from graphql import GraphQLError


class GenreNode(DjangoObjectType):
    class Meta:
        model = Genre
        filter_fields = {
            "id": ["exact", "lt", "gt"],
            "description": ["exact", "icontains", "istartswith"],
            "credit": ["exact", "icontains", "istartswith"],
        }
        interfaces = (relay.Node,)
        connection_class = ExtendedConnection


class PlayerNode(DjangoObjectType):
    class Meta:
        model = Player
        filter_fields = "__all__"
        interfaces = (relay.Node,)
        connection_class = ExtendedConnection


class WhiteCardNode(DjangoObjectType):
    rating = graphene.Field(CardRating, source="rating")

    class Meta:
        model = WhiteCard
        filter_fields = "__all__"
        filter_fields = {
            "text": ["exact", "icontains", "istartswith"],
            "genre": ["exact"],
        }
        interfaces = (relay.Node,)
        connection_class = ExtendedConnection


class BlackCardNode(DjangoObjectType):
    rating = graphene.Field(CardRating, source="rating")

    class Meta:
        model = BlackCard
        filter_fields = "__all__"
        interfaces = (relay.Node,)
        connection_class = ExtendedConnection


class AvailableQuestionNode(DjangoObjectType):
    class Meta:
        model = AvailableQuestion
        filter_fields = "__all__"
        interfaces = (relay.Node,)
        connection_class = ExtendedConnection


class QuestionNode(DjangoObjectType):
    class Meta:
        model = Question
        filter_fields = "__all__"
        interfaces = (relay.Node,)
        connection_class = ExtendedConnection


class AvailableAnswerNode(DjangoObjectType):
    class Meta:
        model = AvailableAnswer
        filter_fields = "__all__"
        interfaces = (relay.Node,)
        connection_class = ExtendedConnection


class AnswerNode(DjangoObjectType):
    class Meta:
        model = Answer
        filter_fields = "__all__"
        interfaces = (relay.Node,)
        connection_class = ExtendedConnection


class GameNode(DjangoObjectType):
    user_answers = graphene.Field(graphene.List(AnswerNode))
    available_questions = graphene.Field(graphene.List(AvailableQuestionNode))
    available_answers = graphene.Field(graphene.List(AvailableAnswerNode))
    tick = graphene.DateTime(source="tick")
    czar = graphene.Field(PlayerNode, source="czar")
    question = graphene.Field(QuestionNode, source="question")
    answers = graphene.Field(graphene.List(AnswerNode), source="answers")
    czar_answers = graphene.Field(graphene.List(AnswerNode), source="czar_answers")

    class Meta:
        model = Game
        filter_fields = "__all__"
        exclude_fields = [
            "availablequestion_set",
            "availableanswer_set",
            "question_set",
            "answer_set",
        ]
        interfaces = (relay.Node,)
        connection_class = ExtendedConnection

    def resolve_available_questions(self, info, **kwargs):
        try:
            user = info.context.user
            player = self.player_set.get(user=user)
            is_czar = self.czar.user.id == user.id
            return self.available_questions if is_czar else None
        except:
            return None

    def resolve_available_answers(self, info, **kwargs):
        try:
            user = info.context.user
            players = self.player_set.order_by("created_at").all()
            player_ids = [x.user.id for x in players if x.user.id != self.czar.user.id]
            player_index = player_ids.index(user.id)
            num_players = self.num_players - 1
            answers = self.available_answers
            no_of_answers = len(answers)
            step = floor(no_of_answers / num_players)
            start = player_index * step
            stop = (player_index + 1) * step
            return answers[start:stop]
        except:
            return None

    def resolve_user_answers(self, info, **kwargs):
        answers = (
            self.answers.filter(player__user=info.context.user) if self.answers else []
        )

        return None if (len(list(answers)) < 1) else answers


class JWTPayloadNode(graphene.ObjectType):
    username = graphene.String()
    iss = graphene.String()
    sub = graphene.String()
    aud = graphene.String()
    exp = graphene.Int()
    nbf = graphene.Int()
    iat = graphene.Int()
    jti = graphene.String()
    username = graphene.String()
    provider = graphene.String()
    name = graphene.String()
    avatar = graphene.String()
    email = graphene.String()
    email_verified = graphene.Boolean()
    name = graphene.String()


class UserNode(DjangoObjectType):
    class Meta:
        model = get_user_model()
        interfaces = (relay.Node,)
        exclude_fields = ()
        filter_fields = "__all__"
        connection_class = ExtendedConnection


class ProviderNode(DjangoObjectType):
    class Meta:
        model = Provider
        interfaces = (relay.Node,)
        filter_fields = "__all__"
        connection_class = ExtendedConnection


class ProfileNode(DjangoObjectType):
    class Meta:
        model = Profile
        interfaces = (relay.Node,)
        filter_fields = "__all__"
        connection_class = ExtendedConnection


class InviteNode(DjangoObjectType):
    class Meta:
        model = Invite
        interfaces = (relay.Node,)
        filter_fields = "__all__"
        connection_class = ExtendedConnection


class NotificationNode(graphene.ObjectType):
    id = graphene.ID(required=True)
    invites = DjangoFilterConnectionField(
        InviteNode,
        description="find game invites",
        filterset_class=InvitesFilter,
    )

    def resolve_id(self, info, **kwargs):
        return info.context.user.id

    def resolve_invites(self, info, **kwargs):
        try:
            return get_invites(user=info.context.user, **kwargs)
        except Provider.DoesNotExist:
            raise GraphQLError(GraphQLErrors.NOT_AUTHORIZED)


class ChatNode(graphene.ObjectType):
    room = graphene.ID(required=True)
    sender = graphene.ID(required=True)
    message = graphene.String(required=True)
