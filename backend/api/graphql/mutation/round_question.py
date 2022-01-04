import graphene
from api.graphql.inputs import RoundQuestionMutationInput
from api.models.question import Question
from graphene.types.mutation import Mutation


class RoundQuestionMutation(Mutation):
    ok = graphene.Boolean()

    class Arguments:
        input = RoundQuestionMutationInput(required=True)

    def mutate(root, info, input):
        input["player_id"] = input.get("player")
        input["game_id"] = input.get("game")
        input["card_id"] = input.get("card")
        [input.pop(item) for item in ["player", "game", "card"]]
        Question.objects.get_or_create(**input)
        return RoundQuestionMutation(ok=True)
