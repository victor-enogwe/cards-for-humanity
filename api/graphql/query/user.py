import graphene
from graphene_django.filter import DjangoFilterConnectionField
from graphql_jwt.decorators import login_required

from api.graphql.nodes import UserNode


class UserQuery(graphene.ObjectType):
    whoami = graphene.Field(UserNode)
    users = DjangoFilterConnectionField(UserNode, description='find users')

    @login_required
    def resolve_whoami(self, info):
        return info.context.user
