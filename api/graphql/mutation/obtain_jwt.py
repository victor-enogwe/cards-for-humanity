from graphene import ClientIDMutation, InputField, String
from graphql_jwt.mixins import ObtainJSONWebTokenMixin, ResolveMixin

from api.graphql.nodes import JWTPayloadNode
from api.utils.functions import token_auth


class ObtainJSONWebTokenMutation(ResolveMixin, ObtainJSONWebTokenMixin, ClientIDMutation):
    payload = JWTPayloadNode()

    @classmethod
    def Field(cls, *args, **kwargs):
        cls._meta.arguments["input"]._meta.fields.update(
            {
                "username": InputField(String, required=True),
                "password": InputField(String, required=True),
            },
        )
        return super().Field(*args, **kwargs)

    @classmethod
    @token_auth
    def mutate_and_get_payload(cls, root, info, **kwargs):
        return cls.resolve(root, info, **kwargs)
