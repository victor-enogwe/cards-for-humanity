from base64 import b64encode

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
from api.utils.graphql_errors import GraphQLErrors
from django.contrib.auth import get_user_model
from django.db.models.expressions import OuterRef
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
    available_questions = graphene.Field(
        graphene.List(BlackCardNode), source="available_questions"
    )
    available_answers = graphene.Field(
        graphene.List(WhiteCardNode), source="available_answers"
    )
    question = graphene.Field(BlackCardNode, source="question")
    answers = graphene.Field(graphene.List(WhiteCardNode), source="answers")

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
            kwargs["game__status"] = GameStatus.GAP
            email = kwargs.get("email")
            user = info.context.user
            query_set = (
                InvitesFilter(kwargs)
                .qs.filter(game__status=GameStatus.GAP)
                .extra(
                    tables=["api_provider"],
                    select={
                        "api_provider.user_id": "api_provider.user_id",
                    },
                    where=["api_provider.email = %s", "api_provider.user_id = %s"],
                    params=[email, user.id],
                )
                .exclude(
                    game__player_set__game=OuterRef("game"), game__player_set__user=user
                )
            )

            return query_set
        except Provider.DoesNotExist:
            raise GraphQLError(GraphQLErrors.NOT_AUTHORIZED)
