import graphene
from api.graphql.nodes import NotificationNode
from channels_graphql_ws import Subscription


class NotificationSubscription(Subscription):
    """notifications subscription"""

    notification_queue_limit = 64
    notifications = graphene.Field(NotificationNode)

    @classmethod
    def subscribe(cls, root, info, **kwargs):
        """Called when user subscribes."""

        user = info.context.user

        # Return the list of subscription group names.
        return ["notifications:{0}".format(user.id)] if user is not None else None

    @classmethod
    def publish(cls, payload, info, *args, **kwargs):
        """Called to notify the client."""

        notifications: NotificationNode = payload.get("notifications")

        assert notifications["id"] is not None

        # Here `payload` contains the `payload` from the `broadcast()`
        # invocation (see below). You can return `MySubscription.SKIP`
        # if you wish to suppress the notification to a particular
        # client. For example, this allows to avoid notifications for
        # the actions made by this particular client.
        return NotificationSubscription(notifications=notifications)

    @classmethod
    def on_new_notification(cls, notifications):
        return cls.broadcast(
            group=str("notifications:{0}".format(notifications["id"])),
            payload={"notifications": notifications},
        )
