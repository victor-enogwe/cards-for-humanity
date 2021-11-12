from rest_framework.serializers import ModelSerializer

from api.models.player import Player


class PlayerSerializer(ModelSerializer):
    class Meta:
        model = Player
        fields = '__all__'
