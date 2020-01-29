import jwt
import graphql_jwt
from graphene import Schema
from channels_graphql_ws import GraphqlWsConsumer
from graphql_jwt.decorators import login_required
import graphql_social_auth
from .blackcard import graphene, BlackCardQuery, BlackCardMutation
from .user import UserNode, UserQuery, UserMutation
from .whitecard import WhiteCardQuery
from .game import GameQuery, GameMutation, GameSubscription
from .player import PlayerQuery
from .genre import GenreQuery

class RootQuery(UserQuery, BlackCardQuery, WhiteCardQuery, GameQuery, PlayerQuery, GenreQuery, graphene.ObjectType):
    '''Root Query for the cards against humanity api.'''
    pass


class RootMutation(UserMutation, GameMutation, graphene.ObjectType):
    '''Root Mutation for the cards against humanity api.'''
    social_auth = graphql_social_auth.relay.SocialAuth.Field()
    token_auth = graphql_jwt.relay.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.relay.Verify.Field()
    refresh_token = graphql_jwt.relay.Refresh.Field()
    # Long running refresh tokens
    revoke_token = graphql_jwt.relay.Revoke.Field()


class RootSubscription(GameSubscription, graphene.ObjectType):
    '''Root Subscription for the cards against humanity api.'''
    pass



schema = Schema(query=RootQuery, mutation=RootMutation, subscription=RootSubscription)


class GraphqlWsConsumer(GraphqlWsConsumer):
    """Channels WebSocket consumer which provides GraphQL API."""
    schema = schema
    send_keepalive_every = 60
    subscription_confirmation_message = { 'data': 'connected to websocket' }
    middleware = []

    async def on_connect(self, payload):
        """New client connection handler."""
        token = payload.get('authToken').get('__zone_symbol__value')
        # print(token)
        # decoded = jwt.decode(token)

        # print(decoded)
        # You can `raise` from here to reject the connection.
        print("New client connected!")

    async def on_disconnect(self, payload):
        print('client disconnected')
