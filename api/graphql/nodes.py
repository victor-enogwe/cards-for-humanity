import graphene
from django.contrib.auth import get_user_model
from graphene import relay
from graphene_django import DjangoObjectType

from api.models.blackcard import BlackCard
from api.models.game import Game
from api.models.genre import Genre
from api.models.player import Player
from api.models.profile import Profile
from api.models.whitecard import WhiteCard
from api.utils.extended_connection import ExtendedConnection


class GenreNode(DjangoObjectType):
    class Meta:
        model = Genre
        filter_fields = {
            'id': ['exact', 'lt', 'gt'],
            'description': ['exact', 'icontains', 'istartswith'],
            'credit': ['exact', 'icontains', 'istartswith']
        }
        interfaces = (relay.Node, )
        connection_class = ExtendedConnection


class PlayerNode(DjangoObjectType):
    class Meta:
        model = Player
        filter_fields = '__all__'
        interfaces = (relay.Node, )
        connection_class = ExtendedConnection


class GameNode(DjangoObjectType):
    class Meta:
        model = Game
        filter_fields = '__all__'
        interfaces = (relay.Node, )
        connection_class = ExtendedConnection


class WhiteCardNode(DjangoObjectType):
    class Meta:
        model = WhiteCard
        filter_fields = '__all__'
        filter_fields = {
            'text': ['exact', 'icontains', 'istartswith'],
            'genre': ['exact']
        }
        interfaces = (relay.Node, )
        connection_class = ExtendedConnection


class BlackCardNode(DjangoObjectType):
    class Meta:
        model = BlackCard
        filter_fields = '__all__'
        interfaces = (relay.Node, )
        connection_class = ExtendedConnection


class JWTPayloadNode(graphene.ObjectType):
    username = graphene.String()
    sub = graphene.Int()
    sub_name = graphene.String()
    exp = graphene.Int()


class UserNode(DjangoObjectType):
    class Meta:
        model = get_user_model()
        interfaces = (relay.Node, )
        exclude_fields = ()
        filter_fields = '__all__'
        connection_class = ExtendedConnection


class ProfileNode(DjangoObjectType):
    class Meta:
        model = Profile
        interfaces = (relay.Node, )
        filter_fields = '__all__'
        connection_class = ExtendedConnection
