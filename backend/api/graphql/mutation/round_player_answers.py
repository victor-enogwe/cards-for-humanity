import graphene
from api.graphql.inputs import RoundPlayerAnswersMutationInput
from api.models.answer import Answer
from graphene.types.mutation import Mutation


class RoundPlayerAnswersMutation(Mutation):
    ok = graphene.Boolean()

    class Arguments:
        input = RoundPlayerAnswersMutationInput(required=True)

    def mutate(root, info, input):
        player = input.get("player")
        game = input.get("game")
        question = input.get("question")
        round = input.get("round")
        cards = input.get("cards")
        [
            Answer.objects.get_or_create(
                card_id=card.get("id"),
                question_id=question,
                player_id=player,
                game_id=game,
                round=round,
                rating=card.get("rating"),
            )
            for card in cards
        ]
        return RoundPlayerAnswersMutation(ok=True)
