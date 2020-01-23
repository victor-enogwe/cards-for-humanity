import graphql_jwt
from graphene import Schema
from graphql_jwt.decorators import login_required
from .question import graphene, QuestionQuery, QuestionMutation
from .user import UserType, UserQuery, UserMutation
from .answer import AnswerQuery
from .game import GameQuery, GameMutation, GameSubscription
from .player import PlayerQuery


class RootQuery(UserQuery, QuestionQuery, AnswerQuery, GameQuery, PlayerQuery, graphene.ObjectType):
    viewer = graphene.Field(UserType)

    @login_required
    def resolve_viewer(self, info, **kwargs):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception('Authentication credentials were not provided')
        return user


class RootMutation(UserMutation, GameMutation, graphene.ObjectType):
    token_auth = graphql_jwt.relay.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.relay.Verify.Field()
    refresh_token = graphql_jwt.relay.Refresh.Field()
    # Long running refresh tokens
    revoke_token = graphql_jwt.relay.Revoke.Field()


class RootSubscription(GameSubscription, graphene.ObjectType):
    pass


schema = Schema(query=RootQuery, mutation=RootMutation, subscription=RootSubscription)
