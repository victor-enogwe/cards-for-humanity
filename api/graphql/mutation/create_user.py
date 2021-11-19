from pprint import pprint

import graphene
from django.contrib.auth import get_user_model
from django.db import IntegrityError
from graphql.error.base import GraphQLError

from api.graphql.inputs import CreateUserMutationInput


class CreateUserMutation(graphene.Mutation):
    ok = graphene.Boolean()

    class Arguments:
        input = CreateUserMutationInput(required=True)

    def mutate(self, info, input, **kwargs):
        try:
            user_model = get_user_model()
            user_model._default_manager.create_user(**input, **kwargs)
            return {'ok': True}
        except IntegrityError as error:
            return GraphQLError('user already exists!')
        except Exception as error:
            return GraphQLError(error)
