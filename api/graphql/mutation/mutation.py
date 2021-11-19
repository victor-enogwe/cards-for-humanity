from graphene.types.objecttype import ObjectType
from graphql_jwt.relay import DeleteRefreshTokenCookie as DeleteRefreshTokenCookieMutation
from graphql_jwt.relay import Refresh as RefreshTokenMutation
from graphql_jwt.relay import Verify as VerifyTokenMutation
from graphql_social_auth.relay import SocialAuthJWT as SocialAuthJWTMutation

# from api.graphql.mutation.create_game import CreateGameMutation
from api.graphql.mutation.create_user import CreateUserMutation
from api.graphql.mutation.join_game import JoinGameMutation
from api.graphql.mutation.obtain_jwt import ObtainJSONWebTokenMutation
from api.graphql.mutation.update_game_status import UpdateGameStatusMutation


class Mutation(ObjectType):
    '''Root Mutation for the cards against humanity api.'''
    # create_game = CreateGameMutation.Field()
    create_user = CreateUserMutation.Field()
    update_game_status = UpdateGameStatusMutation.Field()
    join_game = JoinGameMutation.Field()
    social_auth = SocialAuthJWTMutation.Field()
    token_auth = ObtainJSONWebTokenMutation.Field()
    verify_token = VerifyTokenMutation.Field()
    refresh_token = RefreshTokenMutation.Field()
    delete_refresh_token_cookie = DeleteRefreshTokenCookieMutation.Field()
