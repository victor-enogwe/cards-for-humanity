import graphene
from api.graphql.nodes import GenreNode
from graphene_django.filter import DjangoFilterConnectionField


class GenreQuery(graphene.ObjectType):
    genres = DjangoFilterConnectionField(GenreNode, description="all cards genre")
