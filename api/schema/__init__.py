import graphql_jwt
from graphene import Schema
from graphql_jwt.decorators import login_required
from .blackcard import graphene, BlackCardQuery, BlackCardMutation
from .user import UserNode, UserQuery, UserMutation
from .whitecard import WhiteCardQuery
from .game import GameQuery, GameMutation, GameSubscription
from .player import PlayerQuery
from .genre import GenreQuery

class RootQuery(UserQuery, BlackCardQuery, WhiteCardQuery, GameQuery, PlayerQuery, GenreQuery, graphene.ObjectType):
    '''Root Query for the cards against humanity api.'''
    viewer = graphene.Field(UserNode)

    # @classmethod
    # def get_queryset(cls, queryset, info):
    #     print(info.context.user)
    #     if info.context.user.is_anonymous:
    #         return queryset.filter(_id=True)
    #     return queryset

    @login_required
    def resolve(self, info, **kwargs):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception('Authentication credentials were not provided')
        return user


class RootMutation(UserMutation, GameMutation, graphene.ObjectType):
    '''Root Mutation for the cards against humanity api.'''
    token_auth = graphql_jwt.relay.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.relay.Verify.Field()
    refresh_token = graphql_jwt.relay.Refresh.Field()
    # Long running refresh tokens
    revoke_token = graphql_jwt.relay.Revoke.Field()


class RootSubscription(GameSubscription, graphene.ObjectType):
    '''Root Subscription for the cards against humanity api.'''
    pass


schema = Schema(query=RootQuery, mutation=RootMutation, subscription=RootSubscription)
