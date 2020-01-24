from rest_meets_djongo.serializers import DjongoModelSerializer
from . import Game, Player, BlackCard, WhiteCard, Genre

class GameSerializer(DjongoModelSerializer):
    class Meta:
        model = Game
        fields = '__all__'

class PlayerSerializer(DjongoModelSerializer):
    class Meta:
        model = Player
        fields = '__all__'

class BlackCardSerializer(DjongoModelSerializer):
    class Meta:
        model = BlackCard
        fields = '__all__'

class WhiteCardSerializer(DjongoModelSerializer):
    class Meta:
        model = WhiteCard
        fields = '__all__'

class GenreSerializer(DjongoModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'