import graphene
from graphene_django.filter import DjangoFilterConnectionField

from api.graphql.nodes import WhiteCardNode


class WhiteCardQuery(graphene.ObjectType):
    white_cards = DjangoFilterConnectionField(WhiteCardNode)
