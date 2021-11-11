import graphene
from channels_graphql_ws import Subscription
from graphene import Mutation, relay
from graphene.types import InputObjectType
from graphene.types.objecttype import ObjectType
from graphene.types.scalars import ID
from graphene_django import DjangoObjectType
from graphene_django_cud.mutations.create import DjangoCreateMutation
from graphene_django_cud.mutations.update import DjangoUpdateMutation

from api.models import Game, Player, player
from api.models.serializers import GameSerializer
from api.utils import ExtendedConnection


class GameNode(DjangoObjectType):
    class Meta:
        model = Game
        filter_fields = '__all__'
        interfaces = (relay.Node, )
        connection_class = ExtendedConnection


class JoinGameSubscription(Subscription):
    notification_queue_limit = 64
    event = graphene.String()

    class Arguments:
        game_room = graphene.String()
        user = graphene.String()

    class Meta:
        queryset = None
        serializer_class = GameSerializer
        stream = 'games'

    @staticmethod
    def subscribe(root, info, arg1, arg2):
        """Called when user subscribes."""

        # Return the list of subscription group names.
        return ['group42']

    @staticmethod
    def publish(payload, info, arg1, arg2):
        """Called to notify the client."""

        # Here `payload` contains the `payload` from the `broadcast()`
        # invocation (see below). You can return `MySubscription.SKIP`
        # if you wish to suppress the notification to a particular
        # client. For example, this allows to avoid notifications for
        # the actions made by this particular client.

        return JoinGameSubscription(event='Something has happened!')

    @classmethod
    def subscription_resolver(cls, root, info, **kwargs):
        result = super().subscription_resolver(root, info, **kwargs)
        return result


class GameQuery(graphene.ObjectType):
    game = graphene.Field(GameNode, id=graphene.ID())


class CreateGameMutation(DjangoCreateMutation):
    class Meta:
        model = Game
        exclude_fields = ('status', 'winner', 'creator', 'created_at')

    def mutate(root, info, input):
        print(root, info, input)
        return DjangoCreateMutation.mutate(root, info, input)


class UpdateGameStatusMutation(DjangoUpdateMutation):
    class Meta:
        model = Game
        only_fields = ('status')
        required_fields = ('status')


class JoinGameInput(InputObjectType):
    player_id = ID(required=True)
    game_id = ID(required=True)


class JoinGameMutation(Mutation):
    ok = graphene.Boolean()
    game = graphene.Field(GameNode)

    class Arguments:
        input = JoinGameInput(required=True)

    def mutate(root, info, input):
        player = Player(player=input['player_id'], game=input['game_id'])
        return JoinGameMutation(ok=True, game=player.game)


class GameMutation(graphene.ObjectType):
    create_game = CreateGameMutation.Field()
    update_game_status = UpdateGameStatusMutation.Field()
    join_game = JoinGameMutation.Field()


class GameSubscription(graphene.ObjectType):
    '''join game'''
    join_game = JoinGameSubscription.Field()
