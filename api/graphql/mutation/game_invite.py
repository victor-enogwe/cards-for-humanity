import graphene
from graphene_django_cud.mutations.batch_create import DjangoBatchCreateMutation

from api.graphql.nodes import InviteNode
from api.models.invite import Invite


class GameInviteMutation(DjangoBatchCreateMutation):
    class Meta:
        model = Invite
        exclude_fields = (
            "created_at",
            "updated_at",
        )
