import graphene
from graphql_jwt import mixins
from graphql_jwt.relay import JSONWebTokenMutation


class PayloadNode(graphene.ObjectType):
    refresh_token = graphene.String()
    pass


class JWTMutation(JSONWebTokenMutation):
    payload = PayloadNode()

    class Meta:
        abstract = True


class ObtainJSONWebToken(mixins.ResolveMixin, JWTMutation):
    pass
