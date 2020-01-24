from django.contrib import admin
from api.models import BlackCard, WhiteCard, Game, Player
from api.models.serializers import (
    GameSerializer,
    WhiteCardSerializer,
    BlackCardSerializer,
    PlayerSerializer,
    Genre,
    GenreSerializer
)

@admin.register(BlackCard)
class BlackCardAdmin(admin.ModelAdmin):
    list_display = ('_id', 'text', 'genre', 'pick')
    list_editable = ('text', 'genre', 'pick')


@admin.register(WhiteCard)
class WhiteCardAdmin(admin.ModelAdmin):
    list_display = ('_id', 'text')
    list_editable = ('text', )

    class Meta:
        serializer_class = WhiteCardSerializer


@admin.register(Game)
class GameAdmin(admin.ModelAdmin):
    list_display = ('_id', 'genre', 'round_time', 'rounds', 'num_players', 'status')

    class Meta:
        serializer_class = GameSerializer

@admin.register(Genre)
class GenreAdmin(admin.ModelAdmin):
    list_display = ('_id', 'description', 'credit')

    class Meta:
        serializer_class = GenreSerializer


@admin.register(Player)
class PlayerAdmin(admin.ModelAdmin):
    list_display = ('_id', 'game', 'user', 'score')
