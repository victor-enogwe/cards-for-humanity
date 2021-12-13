from channels import auth
from channels_graphql_ws import GraphqlWsConsumer as GQLConsumer
from graphene import Schema

from api.graphql.middlewares.gql_depromise_subscription import depromise_subscription
from api.graphql.mutation.mutation import Mutation
from api.graphql.query.query import Query
from api.graphql.subscription.subscription import Subscription

gql_schema = Schema(query=Query, mutation=Mutation, subscription=Subscription)


class GraphqlWsConsumer(GQLConsumer):
    """Channels WebSocket consumer which provides GraphQL API."""

    schema = gql_schema
    send_keepalive_every = 60
    confirm_subscriptions = False
    middleware = [depromise_subscription]

    async def on_connect(self, payload):
        pass

    async def on_disconnect(self, payload):
        print("client disconnected")
