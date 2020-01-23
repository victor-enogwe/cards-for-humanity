import graphene
from graphene import relay
from graphene_django import DjangoObjectType
from ..models import Answer


class AnswerType(DjangoObjectType):
    class Meta:
        model = Answer
        interfaces = (relay.Node, )


class AnswerQuery(graphene.ObjectType):
    all_answers = graphene.List(AnswerType)

    def resolve_all_answers(self, info, **kwargs):
        return Answer.objects.all()


class AnswerMutation(graphene.ObjectType):
    pass
