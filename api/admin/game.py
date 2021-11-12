from django.contrib import admin

from api.models.game import Game
from api.serializers.game import GameSerializer


@admin.register(Game)
class GameAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'genres_display',
        'round_time',
        'rounds',
        'num_players',
        'status'
    )

    def genres_display(self):
        return "\n".join([genre.genres for genre in self.genres.all()])

    class Meta:
        serializer_class = GameSerializer
