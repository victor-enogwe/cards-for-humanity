from django.contrib import admin

from api.models.blackcard import BlackCard
from api.serializers.blackcard import BlackCardSerializer


@admin.register(BlackCard)
class BlackCardAdmin(admin.ModelAdmin):
    list_display = ('id', 'text', 'genre', 'pick')
    list_editable = ('text', 'genre', 'pick')

    class Meta:
        serializer_class = BlackCardSerializer
