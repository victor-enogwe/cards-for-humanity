import graphene
from graphene_django.filter import DjangoFilterConnectionField

from api.graphql.nodes import GenreNode


class GenreQuery(graphene.ObjectType):
    genres = DjangoFilterConnectionField(GenreNode, description="all cards genre")
