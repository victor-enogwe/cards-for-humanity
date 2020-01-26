import graphene
from graphene import relay
from graphene_django.filter import DjangoFilterConnectionField
from graphene_django import DjangoObjectType
from graphene_django_subscriptions.subscription import Subscription
from rest_framework import serializers
from api.utils import ExtendedConnection
from api.models import Genre
from api.models.serializers import GenreSerializer

class GenreNode(DjangoObjectType):
    class Meta:
        model = Genre
        filter_fields = '__all__'
        interfaces = (relay.Node, )
        connection_class = ExtendedConnection

class GenreSubscriptionType(Subscription):
    class Meta:
        queryset = None
        serializer_class = GenreSerializer
        stream = 'genres'

    @classmethod
    def subscription_resolver(cls, root, info, **kwargs):
        result = super().subscription_resolver(root, info, **kwargs)
        return result

class GenreQuery(graphene.ObjectType):
    all_genres = DjangoFilterConnectionField(GenreNode, description='all cards genre')


class GenreMutation(graphene.ObjectType):
    pass

class GenreSubscription(graphene.ObjectType):
    genre_subscription = GenreSubscriptionType.Field()
