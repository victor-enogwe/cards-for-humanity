from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User

from api.models import BlackCard, Game, Player, WhiteCard
from api.models.serializers import BlackCardSerializer, GameSerializer, Genre, GenreSerializer, PlayerSerializer, WhiteCardSerializer
from api.models.user import Profile


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
    list_display = ('id', 'genres_display', 'round_time',
                    'rounds', 'num_players', 'status')

    def genres_display(self):
        return "\n".join([genre.genres for genre in self.genres.all()])

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


# class AdminProfileInline(admin.StackedInline):
#     model = Profile
#     can_delete = False
#     verbose_name_plural = 'profiles'


# class ProfileUserAdmin(UserAdmin):
#     inlines = (AdminProfileInline,)


# # admin.site.unregister(User)
# admin.site.register(ProfileUserAdmin)
