import graphene
from graphene import relay
from graphql_jwt.shortcuts import get_token
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


class CreateUserFailEmailExists(Exception):
    '''
        A Mutation Exception is an exception that is raised
        when a user with the same email aready exists during create
    '''
    def __init__(self):
        super().__init__("User with this email exists")


class CreateUserFailOthers(Exception):
    '''
        A Mutation Exception is an exception that is raised
        when an error occurs during create
    '''
    def __init__(self):
        super().__init__("User not created, something went wrong, please try again!")


class CreateUserSuccess(graphene.ObjectType):
    user = graphene.Field(UserNode)
    token = graphene.String()

class CreateUserPayload(graphene.Union):
    class Meta:
        types = (CreateUserSuccess,)


class CreateUser(graphene.Mutation):
    Output = CreateUserPayload

    class Arguments:
        email = graphene.String(required=True)
        password = graphene.String(required=True)

    def mutate(self, info, password, email, **kwargs):
        try:
            if User.objects.filter(email=email).exists():
                raise CreateUserFailEmailExists()
            user = User(email=email, username=email)
            user.set_password(password)
            user.save()
            return CreateUserSuccess(user=user, token=get_token(user))
        except CreateUserFailEmailExists:
            return CreateUserFailEmailExists()
        except:
            return CreateUserFailOthers()


class UserMutation(graphene.ObjectType):
    create_user = CreateUser.Field()
