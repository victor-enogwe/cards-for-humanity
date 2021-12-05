from graphene_django_cud.mutations.update import DjangoUpdateMutation

from api.models.game import Game


class GameStatusMutation(DjangoUpdateMutation):
    class Meta:
        model = Game
        only_fields = "status"
        required_fields = "status"
        type_name = "UpdateGameStatusInput"
