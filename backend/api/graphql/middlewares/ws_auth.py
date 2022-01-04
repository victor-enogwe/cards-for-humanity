from urllib.parse import parse_qs

from api.utils.functions import get_user_by_token
from api.utils.graphql_errors import GraphQLErrors
from asgiref.sync import sync_to_async
from channels.auth import AuthMiddleware
from channels.middleware import BaseMiddleware
from channels.sessions import CookieMiddleware, SessionMiddleware
from django.contrib.auth.models import AnonymousUser
from django.db import close_old_connections
from graphql import GraphQLError
from graphql_jwt.exceptions import JSONWebTokenExpired


class WSAuthMiddleware(BaseMiddleware):
    async def populate_scope(self, scope):
        protocols = scope.get("subprotocols")

        if len(protocols) < 2:
            raise ValueError("WSAuthMiddleware cannot find authorization in scope. ")

        token = protocols[1]
        user = None

        if token is None:
            raise ValueError("WSAuthMiddleware cannot find authorization in scope. ")

        # # Add it to the scope if it's not there already
        if "user" not in scope:
            scope["user"] = AnonymousUser()

        if token is not None:
            user = await sync_to_async(get_user_by_token, thread_sensitive=True)(
                token, scope
            )
            scope["user"] = user

    async def __call__(self, scope, receive, send):
        try:
            # Close old database connections to prevent usage of timed out connections
            close_old_connections()

            scope = dict(scope)

            # Scope injection/mutation per this middleware's needs.
            await self.populate_scope(scope)

            return await super().__call__(scope, receive, send)
        except JSONWebTokenExpired as e:
            raise GraphQLError(GraphQLErrors.NOT_AUTHENTICATED)


# Handy shortcut for applying all three layers at once
def AuthMiddlewareStack(inner):
    return CookieMiddleware(SessionMiddleware(WSAuthMiddleware(AuthMiddleware(inner))))
