from rest_framework.serializers import ModelSerializer
from . import Game, Player, BlackCard, WhiteCard, Genre

class GameSerializer(ModelSerializer):
    class Meta:
        model = Game
        fields = '__all__'

class PlayerSerializer(ModelSerializer):
    class Meta:
        model = Player
        fields = '__all__'

class BlackCardSerializer(ModelSerializer):
    class Meta:
        model = BlackCard
        fields = '__all__'

class WhiteCardSerializer(ModelSerializer):
    class Meta:
        model = WhiteCard
        fields = '__all__'

class GenreSerializer(ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'
