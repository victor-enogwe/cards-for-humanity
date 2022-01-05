import graphene
from api.graphql.nodes import NotificationNode


class NotificationQuery(graphene.ObjectType):
    notifications = graphene.Field(NotificationNode)

    def resolve_notifications(self: None, info, **input):
        return {}
