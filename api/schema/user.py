import graphene
from graphene import relay
from graphene_django.filter import DjangoFilterConnectionField
from django.contrib.auth import get_user_model
from graphene import Schema, relay, resolve_only_args
from graphene_django import DjangoConnectionField, DjangoObjectType
from api.utils import ExtendedConnection


class UserNode(DjangoObjectType):
    class Meta:
        model = get_user_model()
        interfaces = (relay.Node, )
        exclude_fields = ('password', )
        filter_fields = '__all__'
        connection_class = ExtendedConnection


class UserQuery(graphene.ObjectType):
    all_users = DjangoFilterConnectionField(UserNode)


class CreateUser(graphene.Mutation):
    user = graphene.Field(UserNode)

    class Arguments:
        username = graphene.String(required=True)
        password = graphene.String(required=True)
        email = graphene.String(required=True)

    def mutate(self, info, username, password, email):
        user = get_user_model()(
            username=username,
            email=email,
        )
        user.set_password(password)
        user.save()

        return CreateUser(user=user)


class UserMutation(graphene.ObjectType):
    create_user = CreateUser.Field()
