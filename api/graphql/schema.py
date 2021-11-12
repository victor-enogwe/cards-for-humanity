from graphene import Schema

from api.graphql.mutation.mutation import Mutation
from api.graphql.query.query import Query
from api.graphql.subscription.subscription import Subscription

schema = Schema(
    query=Query,
    mutation=Mutation,
    subscription=Subscription
)
