import graphene
from graphene import Schema, relay, resolve_only_args
from graphene_django import DjangoConnectionField, DjangoObjectType
from ..models import Question


class QuestionType(DjangoObjectType):
    class Meta:
        model = Question


class QuestionQuery(graphene.ObjectType):
    all_questions = graphene.List(QuestionType)

    def resolve_all_questions(self, info, **kwargs):
        return Question.objects.all()


class QuestionMutation(graphene.ObjectType):
    pass
