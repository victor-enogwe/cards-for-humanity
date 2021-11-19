from django.contrib import admin

from api.models.profile import Profile as ProfileModel
from api.utils.functions import get_associated_admin_link


@admin.register(ProfileModel)
class ProfileAdmin(admin.ModelAdmin):
    """Admin panel for user profiles."""

    # Form configuration
    fieldsets = (
        (
            None,
            {"fields": ("gender", "date_of_birth")},
        ),
    )

    readonly_fields = ("get_user_name",)

    # List configuration
    list_display = (
        "get_user_name",
        "gender",
        "date_of_birth",
        "link_user",
    )
    list_filter = ("gender",)
    search_fields = ("get_user_name",)

    def get_user_name(self, obj):
        """Get associated user's name."""
        return obj.user.full_name

    get_user_name.admin_order_field = "user__last_name"
    get_user_name.short_description = "Name"

    def get_queryset(self, request):
        """Override list query to improve query performance (associations)."""
        return super(ProfileAdmin, self).get_queryset(request).select_related("user")

    def link_user(self, obj):
        """Link to associated user."""
        return get_associated_admin_link(obj, "user", "user_user")

    link_user.short_description = "User"
