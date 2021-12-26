from graphene_django_cud.mutations.update import DjangoUpdateMutation

from api.models.game import Game


class GamePrivacyMutation(DjangoUpdateMutation):
    class Meta:
        model = Game
        only_fields = "private"
        required_fields = "private"
        type_name = "UpdateGamePrivacyInput"
