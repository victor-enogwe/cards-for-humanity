from api.graphql.query.blackcard import BlackCardQuery
from api.graphql.query.game import GameQuery
from api.graphql.query.genre import GenreQuery
from api.graphql.query.notification import NotificationQuery
from api.graphql.query.user import UserQuery
from api.graphql.query.whitecard import WhiteCardQuery
from graphene.types.objecttype import ObjectType


class Query(
    UserQuery,
    BlackCardQuery,
    WhiteCardQuery,
    GameQuery,
    GenreQuery,
    NotificationQuery,
    ObjectType,
):
    """Root Query for the cards for humanity api."""

    pass
