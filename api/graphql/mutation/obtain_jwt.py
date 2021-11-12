from graphql_jwt import mixins
from graphql_jwt.relay import JSONWebTokenMutation

from api.graphql.nodes import JWTPayloadNode


class ObtainJSONWebTokenMutation(mixins.ResolveMixin, JSONWebTokenMutation):
    payload = JWTPayloadNode()
