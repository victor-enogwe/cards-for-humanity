import graphene
from graphene import relay
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField

from api.models import Genre
from api.utils import ExtendedConnection


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


class GenreQuery(graphene.ObjectType):
    genres = DjangoFilterConnectionField(
        GenreNode, description='all cards genre')


class GenreMutation(graphene.ObjectType):
    pass
