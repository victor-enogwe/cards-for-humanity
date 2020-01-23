import graphene
from graphene import relay
from graphene_django import DjangoObjectType
from ..models import Question


class QuestionType(DjangoObjectType):
    class Meta:
        model = Question
        interfaces = (relay.Node, )


class QuestionQuery(graphene.ObjectType):
    all_questions = graphene.List(QuestionType)

    def resolve_all_questions(self, info, **kwargs):
        return Question.objects.all()


class QuestionMutation(graphene.ObjectType):
    pass
