from graphql import GraphQLError
from graphql_jwt.decorators import login_required


class AuthorizationMiddleware(object):
    auth_fields = [
        'genres',
        'game',
        'whiteCards',
        'blackCards',
        'whoami',
        'users',
        'createGame',
        'joinGame',
    ]

    @login_required
    def auth(self, next, root, info, **kwargs):
        if not info.context.user.is_authenticated:
            raise GraphQLError('Authentication credentials were not provided')
        return next(root, info, **kwargs)

    def resolve(self, next, root, info, **kwargs):
        if info.field_name in self.auth_fields:
            return self.auth(next, root, info, **kwargs)
        return next(root, info, **kwargs)
