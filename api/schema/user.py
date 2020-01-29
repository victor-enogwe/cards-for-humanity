import graphene
from graphene import relay
from graphene_django.filter import DjangoFilterConnectionField
from api.models import User
from graphene import Schema, relay, resolve_only_args
from graphene_django import DjangoConnectionField, DjangoObjectType
from api.utils import ExtendedConnection


class UserNode(DjangoObjectType):
    class Meta:
        model = User
        interfaces = (relay.Node, )
        exclude_fields = ('password', )
        filter_fields = '__all__'
        connection_class = ExtendedConnection


class UserQuery(graphene.ObjectType):
    # all_users = DjangoFilterConnectionField(UserNode)
    pass


class CreateUser(graphene.Mutation):
    user = graphene.Field(UserNode)

    class Arguments:
        email = graphene.String(required=True)
        password = graphene.String(required=True)

    def mutate(self, info, password, email, **kwargs):
        user = User(email=email, username=email)
        user.set_password(password)
        user.save()

        return CreateUser(user=user)


class UserMutation(graphene.ObjectType):
    create_user = CreateUser.Field()
