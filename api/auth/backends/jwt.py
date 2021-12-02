from graphql_jwt.backends import JSONWebTokenBackend
from graphql_jwt.utils import get_credentials
from api.utils.functions import get_user_by_token

class JWTBackend(JSONWebTokenBackend):
    def authenticate(self, request=None, **kwargs):
        if request is None or getattr(request, "_jwt_token_auth", False):
            return None

        token = get_credentials(request, **kwargs)

        if token is not None:
            return get_user_by_token(token, request)

        return None
