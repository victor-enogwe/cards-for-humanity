from channels_graphql_ws import GraphqlWsConsumer as GQLConsumer

from api.graphql.schema import schema


class GraphqlWsConsumer(GQLConsumer):
    """Channels WebSocket consumer which provides GraphQL API."""
    schema = schema
    send_keepalive_every = 60
    confirm_subscriptions = True
    group_name_prefix = 'cah'
    subscription_confirmation_message = {'data': 'connected to websocket'}
    middleware = []

    async def on_connect(self, payload):
        """New client connection handler."""
        # token = payload.get('authToken').get('__zone_symbol__value')
        # print(token)
        # decoded = jwt.decode(token)

        # print(decoded)
        # You can `raise` from here to reject the connection.
        print(self.channel_name, payload)
        print("New client connected!")

    async def on_disconnect(self, payload):
        print('client disconnected')
