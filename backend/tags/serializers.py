from rest_framework import serializers

from tags.models import Tag

class TagSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Tag
        fields = '__all__'
        read_only_fields = []
        extra_kwargs = {
            'name': {'validators': []},
        }
