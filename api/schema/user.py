import graphene
from graphene import Schema, relay, resolve_only_args
from graphene_django import DjangoConnectionField, DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from graphql_jwt.shortcuts import get_token

from api.models import User
from api.utils import ExtendedConnection


class UserNode(DjangoObjectType):
    class Meta:
        model = User
        interfaces = (relay.Node, )
        exclude_fields = ('password',)
        filter_fields = '__all__'
        connection_class = ExtendedConnection


class UserQuery(graphene.ObjectType):
    pass


class CreateUserFailEmailExists(graphene.ObjectType):
    error_message = graphene.String(required=True)


class CreateUserFailOthers(graphene.ObjectType):
    error_message = graphene.String(required=True)


class CreateUserSuccess(graphene.ObjectType):
    user = graphene.Field(UserNode)
    token = graphene.String()


class CreateUserPayload(graphene.Union):
    class Meta:
        types = (CreateUserFailEmailExists,
                 CreateUserFailOthers, CreateUserSuccess)


class CreateUser(graphene.Mutation):
    Output = CreateUserPayload

    class Input:
        email = graphene.String(required=True)
        password = graphene.String(required=True)

    def mutate(self, info, password, email, **kwargs):
        if User.objects.filter(email=email).exists():
            return CreateUserFailEmailExists(
                error_message="User with this email exists"
            )
        try:
            user = User(email=email, username=email)
            user.set_password(password)
            user.save()
            return CreateUserSuccess(user=user, token=get_token(user))
        except:
            return CreateUserFailOthers(error_message="User not created, something went wrong, please try again!")


class UserMutation(graphene.ObjectType):
    create_user = CreateUser.Field()
