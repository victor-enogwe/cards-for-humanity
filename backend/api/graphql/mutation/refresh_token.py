from graphene import ClientIDMutation, Field
from graphql_jwt.mixins import RefreshMixin

from api.graphql.nodes import JWTPayloadNode


class RefreshTokenMutation(RefreshMixin, ClientIDMutation):
    payload = Field(JWTPayloadNode)

    class Input(RefreshMixin.Fields):
        """Refresh Input"""

    @classmethod
    def mutate_and_get_payload(cls, *args, **kwargs):
        return cls.refresh(*args, **kwargs)
