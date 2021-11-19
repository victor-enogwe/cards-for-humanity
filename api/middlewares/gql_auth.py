from graphql_jwt.decorators import login_required


class AuthorizationMiddleware(object):
    auth_fields = [
        'whiteCards',
        'blackCards',
        'game',
        'verifyToken',
        'refreshToken',
        'revokeToken',
    ]

    @login_required
    def auth(self, next, root, info, **kwargs):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception('Authentication credentials were not provided')
        return next(root, info, **kwargs)

    def resolve(self, next, root, info, **kwargs):
        if info.field_name in self.auth_fields:
            return self.auth(next, root, info, **kwargs)
        return next(root, info, **kwargs)
