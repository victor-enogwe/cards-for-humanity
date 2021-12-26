import graphene
from channels_graphql_ws import Subscription


class NotificationSubscription(Subscription):
    room = graphene.ID()
    sender = graphene.ID()
    message = graphene.String()

    class Arguments:
        room = graphene.ID(required=True)
        sender = graphene.ID(required=True)
        message = graphene.String(required=True)

    @classmethod
    def subscribe(cls, root, info, **kwargs):
        """Called when user subscribes."""

        room = kwargs.get("room")

        # Return the list of subscription group names.
        return [room] if room is not None else None

    @classmethod
    def publish(cls, payload, info, *args, **kwargs):
        """Called to notify the client."""

        room = payload.get("room")
        sender = payload.get("sender")
        message = payload.get("message")

        assert room is not None

        # Here `payload` contains the `payload` from the `broadcast()`
        # invocation (see below). You can return `MySubscription.SKIP`
        # if you wish to suppress the notification to a particular
        # client. For example, this allows to avoid notifications for
        # the actions made by this particular client.
        return NotificationSubscription(sender=sender, room=room, message=message)

    @classmethod
    def new_message(cls, **payload):
        room = payload.get("room")
        return cls.broadcast(group=room, payload=payload)
