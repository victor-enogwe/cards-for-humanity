import graphene
from graphene import relay
from graphene_django.filter import DjangoFilterConnectionField
from graphene_django import DjangoObjectType
from channels_graphql_ws import Subscription
from rest_framework import serializers
from api.utils import ExtendedConnection
from api.models import Genre
from api.models.serializers import GenreSerializer

class GenreNode(DjangoObjectType):
    class Meta:
        model = Genre
        filter_fields = {
            'id': ['exact', 'lt', 'gt'],
            'description': ['exact', 'icontains', 'istartswith'],
            'credit': ['exact', 'icontains', 'istartswith']
        }
        interfaces = (relay.Node, )
        connection_class = ExtendedConnection

class GenreSubscriptionType(Subscription):
    # Subscription payload.
    event = graphene.String()

    class Meta:
        queryset = None
        serializer_class = GenreSerializer
        stream = 'genres'

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

        return GenreSubscriptionType(event='Something has happened!')

class GenreQuery(graphene.ObjectType):
    genres = DjangoFilterConnectionField(GenreNode, description='all cards genre')


class GenreMutation(graphene.ObjectType):
    pass

class GenreSubscription(graphene.ObjectType):
    genre_subscription = GenreSubscriptionType.Field()
