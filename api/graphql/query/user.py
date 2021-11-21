import graphene
from graphene_django.filter import DjangoFilterConnectionField

from api.graphql.nodes import UserNode


class UserQuery(graphene.ObjectType):
    users = DjangoFilterConnectionField(UserNode, description='find users')
