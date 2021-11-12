from rest_framework.serializers import ModelSerializer

from api.models.genre import Genre


class GenreSerializer(ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'
