import graphene
from graphene import Schema, relay, resolve_only_args
from graphene_django import DjangoConnectionField, DjangoObjectType
from ..models import Answer


class AnswerType(DjangoObjectType):
    class Meta:
        model = Answer


class AnswerQuery(graphene.ObjectType):
    all_answers = graphene.List(AnswerType)

    def resolve_all_answers(self, info, **kwargs):
        return Answer.objects.all()


class AnswerMutation(graphene.ObjectType):
    pass
