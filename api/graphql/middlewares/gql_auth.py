from graphql import GraphQLError
from graphql_jwt.decorators import login_required
from api.utils.constants import auth_fields
from api.utils.graphql_errors import GraphQLErrors

class AuthorizationMiddleware(object):
    @login_required
    def auth(self, next, root, info, **kwargs):
        if not info.context.user.is_authenticated:
            raise GraphQLError(GraphQLErrors.USER_SIGNIN__INVALID_CREDENTIALS)
        return next(root, info, **kwargs)

    def resolve(self, next, root, info, **kwargs):
        if info.field_name in auth_fields:
            return self.auth(next, root, info, **kwargs)
        return next(root, info, **kwargs)
