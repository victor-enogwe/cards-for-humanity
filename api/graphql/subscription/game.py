import graphene
from channels_graphql_ws import Subscription

from api.graphql.nodes import GameNode
from api.models.game import Game
from api.serializers.game import GameSerializer


class GameSubscription(Subscription):
    notification_queue_limit = 64
    room = graphene.ID()
    game = graphene.Field(GameNode)

    class Arguments:
        id = graphene.ID(required=True)

    class Meta:
        queryset = None
        serializer_class = GameSerializer
        stream = "games"

    @staticmethod
    def subscribe(root, info, id: graphene.ID):
        """Called when user subscribes."""

        # Return the list of subscription group names.
        return [id] if id is not None else None

    @staticmethod
    def publish(payload, info, id: graphene.ID):
        """Called to notify the client."""
        game_instance: Game = payload.get("game")

        assert id is None or id == game_instance.id

        # Here `payload` contains the `payload` from the `broadcast()`
        # invocation (see below). You can return `MySubscription.SKIP`
        # if you wish to suppress the notification to a particular
        # client. For example, this allows to avoid notifications for
        # the actions made by this particular client.
        return GameSubscription(game=game_instance, room=id)

    @classmethod
    def on_game_updated(cls, game: Game):
        return cls.broadcast_sync(group=str(game.id), payload={"game": game})

    @classmethod
    def subscription_resolver(cls, root, info, **kwargs):
        result = super().subscription_resolver(root, info, **kwargs)
        return result
