from api.graphql.nodes import JWTPayloadNode
from graphene import ClientIDMutation, Field
from graphql_jwt.mixins import RefreshMixin


class RefreshTokenMutation(RefreshMixin, ClientIDMutation):
    payload = Field(JWTPayloadNode)

    class Input(RefreshMixin.Fields):
        """Refresh Input"""

    @classmethod
    def mutate_and_get_payload(cls, root, info, **kwargs):
        return cls.refresh(root, info, **kwargs)
