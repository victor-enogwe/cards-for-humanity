from base64 import b64encode

import graphene
from django.contrib.auth import get_user_model
from graphene import relay
from graphene_django import DjangoObjectType
from graphene_django.filter.fields import DjangoFilterConnectionField
from graphql import GraphQLError

from api.graphql.filtersets import InvitesFilter
from api.models.blackcard import BlackCard
from api.models.game import Game
from api.models.genre import Genre
from api.models.invite import Invite
from api.models.player import Player
from api.models.profile import Profile
from api.models.provider import Provider
from api.models.whitecard import WhiteCard
from api.utils.extended_connection import ExtendedConnection
from api.utils.graphql_errors import GraphQLErrors


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


class GameNode(DjangoObjectType):
    class Meta:
        model = Game
        filter_fields = "__all__"
        exclude_fields = []
        interfaces = (relay.Node,)
        connection_class = ExtendedConnection


class WhiteCardNode(DjangoObjectType):
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
    class Meta:
        model = BlackCard
        filter_fields = "__all__"
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
    invites = DjangoFilterConnectionField(
        InviteNode,
        description="find game invites",
        filterset_class=InvitesFilter,
    )

    def resolve_invites(self, info, **kwargs):
        try:
            email = kwargs.get("email")
            user = info.context.user
            print(kwargs, user)
            Provider.objects.get(email=email, user=user)

            return InvitesFilter(kwargs).qs
        except Provider.DoesNotExist:
            raise GraphQLError(GraphQLErrors.NOT_AUTHORIZED)
