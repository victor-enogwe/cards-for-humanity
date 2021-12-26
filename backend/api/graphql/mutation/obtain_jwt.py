import graphene
from graphene import ClientIDMutation, InputField, String
from graphql_jwt.mixins import ResolveMixin

from api.graphql.nodes import JWTPayloadNode
from api.utils.functions import token_auth


class ObtainJSONWebTokenMutation(ResolveMixin, ClientIDMutation):
    payload = graphene.Field(JWTPayloadNode)
    refresh_expires_in = graphene.Int(required=True)

    @classmethod
    def Field(cls, *args, **kwargs):
        cls._meta.arguments["input"]._meta.fields.update(
            {
                "username": InputField(String, required=True),
                "password": InputField(String, required=True),
            },
        )

        cls._meta.fields["token"] = graphene.Field(
            graphene.String,
            required=True,
        )

        cls._meta.fields["refresh_token"] = graphene.Field(
            graphene.String,
            required=True,
        )

        return super().Field(*args, **kwargs)

    @classmethod
    @token_auth
    def mutate_and_get_payload(cls, root, info, **kwargs):
        return cls.resolve(root, info, **kwargs)

    @classmethod
    def __init_subclass_with_meta__(cls, name=None, **options):
        assert getattr(cls, "resolve", None), (
            f"{name or cls.__name__}.resolve "
            "method is required in a JSONWebTokenMutation."
        )

        super().__init_subclass_with_meta__(name=name, **options)
