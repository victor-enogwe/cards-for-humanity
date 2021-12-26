from django.contrib import admin

from api.models.player import Player
from api.serializers.player import PlayerSerializer


@admin.register(Player)
class PlayerAdmin(admin.ModelAdmin):
    list_display = ("id", "game", "user", "score")

    class Meta:
        serializer_class = PlayerSerializer
