import graphene

from api.graphql.nodes import GameNode


class GameQuery(graphene.ObjectType):
    game = graphene.Field(GameNode, id=graphene.ID())
