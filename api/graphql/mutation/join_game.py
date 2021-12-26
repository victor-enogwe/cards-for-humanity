import graphene
from graphene.types.mutation import Mutation

from api.models.player import Player
from api.models.game import Game
from api.graphql.inputs import JoinGameMutationInput
from api.graphql.nodes import GameNode, PlayerNode


class JoinGameMutation(Mutation):
    ok = graphene.Boolean()
    game = graphene.Field(GameNode)

    class Arguments:
        input = JoinGameMutationInput(required=True)

    def mutate(root, info, input):
        game = Game.objects.get(pk=input.get('game'))
        input['game'] = game
        player = Player(**input, user=info.context.user)
        player.save()
        return JoinGameMutation(ok=True, game=player.game)
