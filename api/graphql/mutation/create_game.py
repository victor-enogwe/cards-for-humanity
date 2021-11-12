from graphene_django_cud.mutations.create import DjangoCreateMutation

from api.models import Game


class CreateGameMutation(DjangoCreateMutation):
    class Meta:
        model = Game
        exclude_fields = ('status', 'winner', 'creator', 'created_at')

    def mutate(root, info, input):
        print(root, info, input)
        return DjangoCreateMutation.mutate(root, info, input)
