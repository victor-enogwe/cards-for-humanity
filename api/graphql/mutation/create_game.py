import graphene
from graphene_django_cud.mutations.create import DjangoCreateMutation
from graphql import GraphQLError

# has to be registered as a field before the mutation is instantiated don not remove
from api.graphql.nodes import GameNode
from api.graphql.query.game import GameQuery
from api.models.game import Game
from api.utils.functions import game_in_progress


class CreateGameMutation(DjangoCreateMutation):
    game = graphene.Field(GameNode)

    class Meta:
        model = Game
        exclude_fields = (
            "status",
            "creator",
            "winner",
            "created_at",
            "updated_at",
            "player_set",
        )
        auto_context_fields = {
            "creator": "user",
        }
        many_to_one_extras = {
            "player_set": {
                "add": {
                    "type": "auto",
                    "exclude_fields": [
                        "created_at",
                        "updated_at",
                        "game",
                        "czar",
                        "score",
                    ],
                    "auto_context_fields": {
                        "user": "user",
                    },
                },
            }
        }

    @classmethod
    def mutate(self, root, info, input):
        existing_game = game_in_progress(user=info.context.user)
        if existing_game:
            raise GraphQLError("you need to end or cancel your previous game")
        return super().mutate(root, info, input)
