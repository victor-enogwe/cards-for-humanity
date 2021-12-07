import graphene
from channels_graphql_ws import Subscription

from api.graphql.nodes import GameNode
from api.graphql.query.game import GameQuery
from api.models.game import Game
from api.utils.functions import game_in_progress


class GameInProgressSubscription(Subscription):
    notification_queue_limit = 64
    gameInProgress = graphene.Field(GameNode)

    @staticmethod
    def subscribe(root, info):
        """Called when user subscribes."""
        game = game_in_progress(user=info.context.user)

        # Return the list of subscription group names.
        return [str(game.id)] if game.id is not None else None

    @staticmethod
    def publish(payload, info):
        """Called to notify the client."""
        gameInProgress: Game = payload.get("gameInProgress")

        assert gameInProgress.id is not None

        # Here `payload` contains the `payload` from the `broadcast()`
        # invocation (see below). You can return `MySubscription.SKIP`
        # if you wish to suppress the notification to a particular
        # client. For example, this allows to avoid notifications for
        # the actions made by this particular client.
        return GameInProgressSubscription(gameInProgress=gameInProgress)

    @classmethod
    def on_game_updated(cls, gameInProgress: Game):
        return cls.broadcast(
            group=str(gameInProgress.id), payload={"gameInProgress": gameInProgress}
        )

    @classmethod
    def subscription_resolver(cls, root, info, **kwargs):
        result = super().subscription_resolver(root, info, **kwargs)
        return result
