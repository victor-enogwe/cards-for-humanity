from api.models.game import Game
from api.utils.enums import GameStatus
from graphene_django_cud.mutations.update import DjangoUpdateMutation


class GameStatusMutation(DjangoUpdateMutation):
    class Meta:
        model = Game
        only_fields = "status"
        required_fields = "status"
        type_name = "UpdateGameStatusInput"

    @classmethod
    def after_mutate(cls, root, info, id, input, game: Game, return_data):
        if game.status == GameStatus.GS:
            game.create_task()
        return super().after_mutate(root, info, id, input, game, return_data)
