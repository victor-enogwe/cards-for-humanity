import graphene
from graphene import relay
from graphene_django.filter import DjangoFilterConnectionField
from graphene_django import DjangoObjectType
from api.utils import ExtendedConnection
from api.models import BlackCard


class BlackCardNode(DjangoObjectType):
    class Meta:
        model = BlackCard
        filter_fields = '__all__'
        interfaces = (relay.Node, )
        connection_class = ExtendedConnection


class BlackCardQuery(graphene.ObjectType):
    all_black_cards = DjangoFilterConnectionField(BlackCardNode)


class BlackCardMutation(graphene.ObjectType):
    pass
