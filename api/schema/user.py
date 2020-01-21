import graphene
from django.contrib.auth import get_user_model
from graphene import Schema, relay, resolve_only_args
from graphene_django import DjangoConnectionField, DjangoObjectType


class UserType(DjangoObjectType):
    class Meta:
        model = get_user_model()


class UserQuery(graphene.ObjectType):
    all_users = graphene.List(UserType)

    def resolve_all_users(self, info, **kwargs):
        return get_user_model().objects.all()


class CreateUser(graphene.Mutation):
    user = graphene.Field(UserType)

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
