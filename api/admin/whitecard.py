from django.contrib import admin

from api.models.whitecard import WhiteCard
from api.serializers.whitecard import WhiteCardSerializer


@admin.register(WhiteCard)
class WhiteCardAdmin(admin.ModelAdmin):
    list_display = ("id", "text")
    list_editable = ("text",)

    class Meta:
        serializer_class = WhiteCardSerializer
