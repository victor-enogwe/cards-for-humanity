import graphene
from graphene import relay
from graphene_django.filter import DjangoFilterConnectionField
from graphene_django import DjangoObjectType
from api.models import WhiteCard
from api.utils import ExtendedConnection


class WhiteCardNode(DjangoObjectType):
    class Meta:
        model = WhiteCard
        filter_fields = '__all__'
        filter_fields = {
            'text': ['exact', 'icontains', 'istartswith'],
            'genre': ['exact']
        }
        interfaces = (relay.Node, )
        connection_class = ExtendedConnection


class WhiteCardQuery(graphene.ObjectType):
    white_cards = DjangoFilterConnectionField(WhiteCardNode)


class WhiteCardMutation(graphene.ObjectType):
    pass
