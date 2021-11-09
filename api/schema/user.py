import graphene
from django.contrib.auth import get_user_model
from graphene import relay
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from graphql_jwt.decorators import login_required, staff_member_required
from graphql_jwt.shortcuts import create_refresh_token, get_token

from api.models import Profile
from api.utils import ExtendedConnection


class UserNode(DjangoObjectType):
    class Meta:
        model = get_user_model()
        interfaces = (relay.Node, )
        exclude_fields = ('password',)
        filter_fields = '__all__'
        connection_class = ExtendedConnection


class ProfileNode(DjangoObjectType):
    class Meta:
        model = Profile
        interfaces = (relay.Node, )
        filter_fields = '__all__'
        connection_class = ExtendedConnection


class CreateUserFailEmailExists(graphene.ObjectType):
    error_message = graphene.String(required=True)


class CreateUserFailOthers(graphene.ObjectType):
    error_message = graphene.String(required=True)


class CreateUserSuccess(graphene.ObjectType):
    user = graphene.Field(UserNode)
    profile = graphene.Field(ProfileNode)
    token = graphene.String()
    refresh_token = graphene.String()


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
        user_model = get_user_model()
        if user_model.objects.filter(email=email).exists():
            return CreateUserFailEmailExists(
                error_message="User with this email exists"
            )
        try:
            user = user_model(email=email, username=email)
            user.set_password(password)
            user.save()
            profile = Profile.objects.get(user=user.id)
            token = get_token(user)
            refresh_token = create_refresh_token(user)

            return CreateUserSuccess(user=user, profile=profile, token=token, refresh_token=refresh_token)
        except:
            return CreateUserFailOthers(error_message="User not created, something went wrong, please try again!")


class UserQuery(graphene.ObjectType):
    whoami = graphene.Field(UserNode)
    users = DjangoFilterConnectionField(UserNode, description='find users')

    @login_required
    def resolve_whoami(self, info):
        return info.context.user


class UserMutation(graphene.ObjectType):
    create_user = CreateUser.Field()
