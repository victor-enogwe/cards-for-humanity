from django.contrib import admin

from api.models.genre import Genre
from api.serializers.genre import GenreSerializer


@admin.register(Genre)
class GenreAdmin(admin.ModelAdmin):
    list_display = ("id", "description", "credit")

    class Meta:
        serializer_class = GenreSerializer
