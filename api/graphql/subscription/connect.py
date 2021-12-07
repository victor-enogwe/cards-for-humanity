import graphene
from channels_graphql_ws import Subscription


class ConnectSubscription(Subscription):
    room = graphene.ID()
    message = graphene.String()
    ok = graphene.Boolean()

    class Arguments:
        room = graphene.ID(required=True)

    @staticmethod
    def subscribe(root, info, room: graphene.ID):
        """Called when user subscribes."""

        # Return the list of subscription group names.
        return [room] if room is not None else None

    @staticmethod
    def publish(payload, info, room: graphene.ID):
        """Called to notify the client."""
        print('publish')
        message = payload.get("data").get("message")

        assert room is None

        # Here `payload` contains the `payload` from the `broadcast()`
        # invocation (see below). You can return `MySubscription.SKIP`
        # if you wish to suppress the notification to a particular
        # client. For example, this allows to avoid notifications for
        # the actions made by this particular client.
        return ConnectSubscription(ok=True, room=room, message=message)

    @classmethod
    def subscription_resolver(cls, root, info, **kwargs):
        result = super().subscription_resolver(root, info, **kwargs)
        return result
