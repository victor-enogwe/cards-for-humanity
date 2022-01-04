import graphene
from api.graphql.inputs import RoundCzarAnswersMutationInput
from api.models.answer import Answer
from graphene.types.mutation import Mutation


class RoundCzarAnswersMutation(Mutation):
    ok = graphene.Boolean()

    class Arguments:
        input = RoundCzarAnswersMutationInput(required=True)

    def mutate(root, info, input):
        answers = input.get("cards")

        for answer in answers:
            node = Answer.objects.get(id=answer.get("id"))
            node.selected = True
            node.rating = answer.get("rating")
            node.save()

        return RoundCzarAnswersMutation(ok=True)
