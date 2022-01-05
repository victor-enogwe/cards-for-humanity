import graphene
from api.graphql.inputs import RoundCzarAnswersMutationInput
from api.models.answer import Answer
from graphene.types.mutation import Mutation
from django.db import transaction


class RoundCzarAnswersMutation(Mutation):
    ok = graphene.Boolean()

    class Arguments:
        input = RoundCzarAnswersMutationInput(required=True)

    @transaction.atomic()
    def mutate(root, info, input):
        answers = input.get("cards")

        for answer in answers:
            node = Answer.objects.get(id=answer.get("id"))
            node.selected = True
            node.rating = answer.get("rating")
            node.player.score += 10
            node.save()
            node.player.save()

        return RoundCzarAnswersMutation(ok=True)
