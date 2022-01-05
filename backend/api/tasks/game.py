from api.graphql.subscription.game_in_progress import GameInProgressSubscription
from api.utils.enums import GameStatus
from celery import shared_task
from django.apps import apps


@shared_task(name="api.game_heartbeat", task_ignore_result=True)
def game_heartbeat(pk: int):
    try:
        game_model = apps.get_model("api.Game")
        game = game_model.objects.get(pk=pk)
        status = game.status

        if status == GameStatus.GE._value_:
            return game.remove_task()

        states = {
            GameStatus.GS._value_: GameStatus.GACQ._value_,
            GameStatus.GACQ._value_: GameStatus.GAPA._value_,
            GameStatus.GAPA._value_: GameStatus.GACA._value_,
            GameStatus.GACA._value_: GameStatus.GSRR._value_,
            GameStatus.GSRR._value_: GameStatus.GACQ._value_,
            GameStatus.GRF._value_: GameStatus.GE._value_,
        }

        new_status = states[status]
        round = game.round + 1 if new_status == GameStatus.GACQ._value_ else game.round

        if round > game.rounds:
            new_status = GameStatus.GRF._value_
            round = game.round

        game.status = new_status
        game.round = round

        game.save()

        GameInProgressSubscription.on_game_updated(game_in_progress=game)
    except Exception as e:
        print(e)
