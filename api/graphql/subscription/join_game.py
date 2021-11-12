import graphene
from channels_graphql_ws import Subscription

from api.serializers.game import GameSerializer


class JoinGameSubscription(Subscription):
    notification_queue_limit = 64
    event = graphene.String()

    class Arguments:
        game_room = graphene.String()
        user = graphene.String()

    class Meta:
        queryset = None
        serializer_class = GameSerializer
        stream = 'games'

    @staticmethod
    def subscribe(root, info, arg1, arg2):
        """Called when user subscribes."""

        # Return the list of subscription group names.
        return ['group42']

    @staticmethod
    def publish(payload, info, arg1, arg2):
        """Called to notify the client."""

        # Here `payload` contains the `payload` from the `broadcast()`
        # invocation (see below). You can return `MySubscription.SKIP`
        # if you wish to suppress the notification to a particular
        # client. For example, this allows to avoid notifications for
        # the actions made by this particular client.

        return JoinGameSubscription(event='Something has happened!')

    @classmethod
    def subscription_resolver(cls, root, info, **kwargs):
        result = super().subscription_resolver(root, info, **kwargs)
        return result
