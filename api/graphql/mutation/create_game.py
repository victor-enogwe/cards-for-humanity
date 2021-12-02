import graphene
from graphene_django_cud.mutations.create import DjangoCreateMutation
from graphql import GraphQLError

# has to be registered as a field before the mutation is instantiated don not remove
from api.graphql.nodes import GameNode
from api.models.game import Game
from api.utils.enums import GameStatus


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
        user = info.context.user
        existing_game = self._meta.model.objects.exclude(
            status=GameStatus.GE
        ).filter(creator=user).first()
        print(existing_game)
        if (existing_game):
            raise GraphQLError('you need to end or cancel your previous game')
        return super().mutate(root, info, input)
