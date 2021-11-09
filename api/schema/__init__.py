from channels_graphql_ws import GraphqlWsConsumer
from graphene import Schema
from graphql_jwt.decorators import login_required
from graphql_jwt.relay import DeleteRefreshTokenCookie, Refresh, Verify
from graphql_social_auth.relay import SocialAuthJWT

from .auth import ObtainJSONWebToken
from .blackcard import BlackCardQuery, graphene
from .game import GameMutation, GameQuery, GameSubscription
from .genre import GenreQuery, GenreSubscription
from .player import PlayerQuery
from .user import UserMutation, UserQuery
from .whitecard import WhiteCardQuery


class Query(UserQuery, BlackCardQuery, WhiteCardQuery, GameQuery, PlayerQuery, GenreQuery, graphene.ObjectType):
    '''Root Query for the cards against humanity api.'''
    pass


class Mutation(UserMutation, GameMutation, graphene.ObjectType):
    '''Root Mutation for the cards against humanity api.'''
    social_auth = SocialAuthJWT.Field()
    token_auth = ObtainJSONWebToken.Field()
    verify_token = Verify.Field()
    refresh_token = Refresh.Field()
    delete_refresh_token_cookie = DeleteRefreshTokenCookie.Field()


class Subscription(GameSubscription, GenreSubscription, graphene.ObjectType):
    '''Root Subscription for the cards against humanity api.'''
    pass


schema = Schema(query=Query, mutation=Mutation,
                subscription=Subscription)


class GraphqlWsConsumer(GraphqlWsConsumer):
    """Channels WebSocket consumer which provides GraphQL API."""
    schema = schema
    send_keepalive_every = 60
    subscription_confirmation_message = {'data': 'connected to websocket'}
    middleware = []

    async def on_connect(self, payload):
        """New client connection handler."""
        # token = payload.get('authToken').get('__zone_symbol__value')
        # print(token)
        # decoded = jwt.decode(token)

        # print(decoded)
        # You can `raise` from here to reject the connection.
        print(self.channel_name)
        print("New client connected!")

    async def on_disconnect(self, payload):
        print('client disconnected')
