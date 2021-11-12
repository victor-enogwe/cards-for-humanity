from django.contrib import admin

from api.models.profile import Profile as ProfileModel


class Profile(admin.StackedInline):
    model = ProfileModel
    can_delete = False
    verbose_name_plural = 'profiles'
