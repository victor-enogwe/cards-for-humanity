import graphql_jwt
from .question import graphene, Schema, QuestionQuery, QuestionMutation
from .user import UserType, UserQuery, UserMutation
from .answer import AnswerQuery
from .game import GameQuery
from .player import PlayerQuery


class Query(UserQuery, QuestionQuery, AnswerQuery, GameQuery, PlayerQuery, graphene.ObjectType):
    viewer = graphene.Field(UserType)

    def resolve_viewer(self, info, **kwargs):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception('Authentication credentials were not provided')
        return user


class Mutation(UserMutation, graphene.ObjectType):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()
    # Long running refresh tokens
    revoke_token = graphql_jwt.relay.Revoke.Field()


schema = Schema(query=Query, mutation=Mutation)
