import graphene
from graphene.types.mutation import Mutation

from api.models.player import Player
from api.graphql.inputs import JoinGameMutationInput
from api.graphql.nodes import GameNode, PlayerNode


class JoinGameMutation(Mutation):
    ok = graphene.Boolean()
    player = graphene.Field(PlayerNode)

    class Arguments:
        input = JoinGameMutationInput(required=True)

    def mutate(root, info, input):
        print(input)
        player = Player(**input, user=info.context.user)
        return JoinGameMutation(ok=True, player=player)
