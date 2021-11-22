from pprint import pprint

import graphene
from graphene_django_cud.mutations.create import DjangoCreateMutation

# has to be registered as a field before the mutation is instantiated don not remove
from api.graphql.nodes import GameNode
from api.models.game import Game


class CreateGameMutation(DjangoCreateMutation):
    game = graphene.Field(GameNode)

    class Meta:
        model = Game
        exclude_fields = ('status', 'creator', 'winner',
                          'created_at', 'updated_at')
        auto_context_fields = {
            'creator': 'user'
        }

    @classmethod
    def mutate(self, root, info, input):
        print(input)
        return super().mutate(root, info, input)
