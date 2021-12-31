from api.graphql.subscription.game_in_progress import GameInProgressSubscription
from api.models.game import Game
from api.utils.enums import GameStatus
from celery import shared_task
from django.apps import apps


@shared_task(name="api.game_heartbeat", task_ignore_result=True)
def game_heartbeat(pk: int):
    game_model = apps.get_model("api.Game")
    game = game_model.objects.get(pk=pk)
    status = game.status

    if status == GameStatus.GE:
        return game.remove_task()

    states = {
        GameStatus.GS: GameStatus.GAC,
        GameStatus.GAC: GameStatus.GAA,
        GameStatus.GAA: GameStatus.GAC,
        GameStatus.GE: GameStatus.GE,
    }

    new_status = states[status]
    round = game.round + 1 if new_status == GameStatus.GAC else game.round

    if round > game.rounds:
        new_status = GameStatus.GE
        round = game.round

    game.status = new_status
    game.round = round

    if new_status == GameStatus.GAC:
        game.select_czar()

    game.save()

    GameInProgressSubscription.on_game_updated(gameInProgress=game)
