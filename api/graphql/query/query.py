from graphene.types.objecttype import ObjectType

from api.graphql.query.notification import NotificationQuery
from api.graphql.query.blackcard import BlackCardQuery
from api.graphql.query.game import GameQuery
from api.graphql.query.genre import GenreQuery
from api.graphql.query.user import UserQuery
from api.graphql.query.whitecard import WhiteCardQuery


class Query(
    UserQuery,
    BlackCardQuery,
    WhiteCardQuery,
    GameQuery,
    GenreQuery,
    NotificationQuery,
    ObjectType,
):
    """Root Query for the cards against humanity api."""

    pass
