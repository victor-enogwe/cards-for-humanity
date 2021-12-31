import graphene
from api.graphql.inputs import RoundQuestionMutationInput
from api.graphql.nodes import GameNode
from api.models.game import Game
from api.models.player import Player
from graphene.types.mutation import Mutation


class RoundQuestionMutation(Mutation):
    ok = graphene.Boolean()

    class Arguments:
        input = RoundQuestionMutationInput(required=True)

    def mutate(root, info, input):
        print(input)
        # input['game'] = game
        # player = Player(**input, user=info.context.user)
        # player.save()
        return RoundQuestionMutation(ok=True)
