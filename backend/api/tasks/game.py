from celery import shared_task
from django.apps import apps


@shared_task(bind=True)
def game_hearbeat(game):
    status = game.status
    new_status = (
        "AWAITING__CZAR"
        if status == "AWAITING_ANSWERS"
        else "AWAITING__ANSWERS"
        if status == "AWAITING_CZAR"
        else status
    )
    apps.get_model("api.Game").objects.filter(pk=game.id).update(status=new_status)
    print(game, "update sent")
