from graphene_django_cud.mutations.update import DjangoUpdateMutation

from api.models.game import Game


class UpdateGameStatusMutation(DjangoUpdateMutation):
    class Meta:
        model = Game
        only_fields = ('status')
        required_fields = ('status')
