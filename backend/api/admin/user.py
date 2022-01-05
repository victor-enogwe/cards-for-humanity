from api.models.user import User
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    fieldsets = (
        (
            None,
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                )
            },
        ),
        # (_('Personal info'), {'fields': ('first_name', 'last_name')}),
        # (_('Permissions'), {
        #     'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions'),
        # }),
        # (_('Important dates'), {'fields': (
        #     'date_joined', "verified_at", "upgraded_at", "created_at")}),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("id"),
            },
        ),
        # ("Profile", {"fields": ("first_name", "last_name", 'last_login')}),
    )
    list_display = ("id", "is_admin")
    ordering = ("id",)
    readonly_fields = ("created_at", "updated_at")
    pass
