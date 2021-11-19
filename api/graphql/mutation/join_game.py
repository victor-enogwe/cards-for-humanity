import graphene
from graphene.types.mutation import Mutation

from api.models.player import Player
from api.graphql.inputs import JoinGameMutationInput
from api.graphql.nodes import GameNode


class JoinGameMutation(Mutation):
    ok = graphene.Boolean()
    game = graphene.Field(GameNode)

    class Arguments:
        input = JoinGameMutationInput(required=True)

    def mutate(root, info, input):
        player = Player(player=input['player_id'], game=input['game_id'])
        return JoinGameMutation(ok=True, game=player.game)
