import graphene
from api.graphql.nodes import GameNode
from api.utils.functions import game_in_progress
from channels_graphql_ws import Subscription


class GameInProgressSubscription(Subscription):
    """join game in progress"""

    notification_queue_limit = 64
    game_in_progress = graphene.Field(GameNode)

    @classmethod
    def subscribe(cls, root, info, **kwargs):
        """Called when user subscribes."""

        game = game_in_progress(user=info.context.user)

        # Return the list of subscription group names.
        return ["game_in_progress:{0}".format(game.id)] if game is not None else None

    @classmethod
    def publish(cls, payload, info, *args, **kwargs):
        """Called to notify the client."""

        game_in_progress = payload.get("game_in_progress")

        assert game_in_progress.id is not None

        # Here `payload` contains the `payload` from the `broadcast()`
        # invocation (see below). You can return `MySubscription.SKIP`
        # if you wish to suppress the notification to a particular
        # client. For example, this allows to avoid notifications for
        # the actions made by this particular client.
        return GameInProgressSubscription(game_in_progress=game_in_progress)

    @classmethod
    def on_game_updated(cls, game_in_progress):
        return cls.broadcast(
            group="game_in_progress:{0}".format(game_in_progress.id),
            payload={"game_in_progress": game_in_progress},
        )
