from rest_framework.serializers import ModelSerializer

from api.models.blackcard import BlackCard


class BlackCardSerializer(ModelSerializer):
    class Meta:
        model = BlackCard
        fields = '__all__'
