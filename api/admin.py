from django.contrib import admin

from api.models import BlackCard, Game, Player, WhiteCard
from api.models.serializers import BlackCardSerializer, GameSerializer, Genre, GenreSerializer, PlayerSerializer, WhiteCardSerializer


@admin.register(BlackCard)
class BlackCardAdmin(admin.ModelAdmin):
    list_display = ('id', 'text', 'genre', 'pick')
    list_editable = ('text', 'genre', 'pick')


@admin.register(WhiteCard)
class WhiteCardAdmin(admin.ModelAdmin):
    list_display = ('id', 'text')
    list_editable = ('text', )

    class Meta:
        serializer_class = WhiteCardSerializer


@admin.register(Game)
class GameAdmin(admin.ModelAdmin):
    list_display = ('id', 'genre', 'round_time',
                    'rounds', 'num_players', 'status')

    class Meta:
        serializer_class = GameSerializer


@admin.register(Genre)
class GenreAdmin(admin.ModelAdmin):
    list_display = ('id', 'description', 'credit')

    class Meta:
        serializer_class = GenreSerializer


@admin.register(Player)
class PlayerAdmin(admin.ModelAdmin):
    list_display = ('id', 'game', 'user', 'score')
