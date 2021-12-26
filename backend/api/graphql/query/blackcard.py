import graphene
from graphene_django.filter import DjangoFilterConnectionField

from api.graphql.nodes import BlackCardNode


class BlackCardQuery(graphene.ObjectType):
    black_cards = DjangoFilterConnectionField(BlackCardNode)
