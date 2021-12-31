from api.models.invite import Invite
from graphene_django_cud.mutations.batch_create import DjangoBatchCreateMutation


class GameInviteMutation(DjangoBatchCreateMutation):
    class Meta:
        model = Invite
        exclude_fields = (
            "created_at",
            "updated_at",
        )
