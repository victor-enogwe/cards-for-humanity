from rest_framework.serializers import ModelSerializer

from api.models.whitecard import WhiteCard


class WhiteCardSerializer(ModelSerializer):
    class Meta:
        model = WhiteCard
        fields = '__all__'
