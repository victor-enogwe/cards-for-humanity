import graphene

from api.graphql.nodes import ProfileNode, UserNode


class CreateUserFailEmailExists(graphene.ObjectType):
    error_message = graphene.String(required=True)


class CreateUserFailOthers(graphene.ObjectType):
    error_message = graphene.String(required=True)


class CreateUserSuccess(graphene.ObjectType):
    user = graphene.Field(UserNode)
    profile = graphene.Field(ProfileNode)
    token = graphene.String()
    refresh_token = graphene.String()


class CreateUserMutation(graphene.Union):
    class Meta:
        types = (
            CreateUserFailEmailExists,
            CreateUserFailOthers,
            CreateUserSuccess
        )
