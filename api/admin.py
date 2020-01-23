from django.contrib import admin
from .models import Question, Answer, Game, Player


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('_id', 'text', 'game_type', 'card_type')
    list_editable = ('text', 'game_type', 'card_type')


@admin.register(Answer)
class AnswerAdmin(admin.ModelAdmin):
    list_display = ('_id', 'text')
    list_editable = ('text', )


@admin.register(Game)
class GameAdmin(admin.ModelAdmin):
    list_display = ('_id', 'game_type', 'round_time', 'rounds', 'num_players', 'status')


@admin.register(Player)
class PlayerAdmin(admin.ModelAdmin):
    list_display = ('_id', 'game', 'player', 'score')
