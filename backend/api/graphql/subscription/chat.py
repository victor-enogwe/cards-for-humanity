import graphene
from api.graphql.inputs import ChatInput
from api.graphql.nodes import ChatNode
from channels_graphql_ws import Subscription


class ChatSubscription(Subscription):
    """chat room subscriptions"""

    notification_queue_limit = 64
    chat = graphene.Field(ChatNode, input=ChatInput(required=True))

    @classmethod
    def subscribe(cls, root, info, **kwargs):
        """Called when user subscribes."""

        room = kwargs.get("room")

        # Return the list of subscription group names.
        return ["chat:{0}".format(room)] if room is not None else None

    @classmethod
    def publish(cls, payload, info, *args, **kwargs):
        """Called to notify the client."""
        chat = payload.get("chat")

        assert chat["room"] is not None

        # Here `payload` contains the `payload` from the `broadcast()`
        # invocation (see below). You can return `MySubscription.SKIP`
        # if you wish to suppress the notification to a particular
        # client. For example, this allows to avoid notifications for
        # the actions made by this particular client.
        return ChatSubscription(chat=chat)

    @classmethod
    def new_message(cls, chat):
        return cls.broadcast(
            group="chat:{0}".format(chat["room"]), payload={"chat": chat}
        )
