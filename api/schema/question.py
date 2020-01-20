import graphene
from graphene import Schema, relay, resolve_only_args
from graphene_django import DjangoConnectionField, DjangoObjectType
from ..models import Question, Answer


class Query(graphene.ObjectType):
    pass


class Mutation(graphene.ObjectType):
    pass
