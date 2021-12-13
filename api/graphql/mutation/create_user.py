from pprint import pprint

import graphene
from django.contrib.auth import get_user_model
from django.db import IntegrityError
from graphql import GraphQLError

from api.graphql.inputs import CreateUserMutationInput
from api.utils.graphql_errors import GraphQLErrors


class CreateUserMutation(graphene.Mutation):
    ok = graphene.Boolean()

    class Arguments:
        input = CreateUserMutationInput(required=True)

    def mutate(self, info, input, **kwargs):
        try:
            user_model = get_user_model()
            user_model._default_manager.create_user(**input, **kwargs)
            return CreateUserMutation(ok=True)
        except IntegrityError as error:
            raise GraphQLError(GraphQLErrors.USER_SIGNUP__DUPLICATE_ACCOUNT)
        except Exception as error:
            raise GraphQLError(error)
