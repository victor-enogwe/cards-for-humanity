from django_filters import FilterSet

from api.models.invite import Invite


class InvitesFilter(FilterSet):
    class Meta:
        model = Invite
        fields = ["email", "revoked"]
        exclude = ["game"]
