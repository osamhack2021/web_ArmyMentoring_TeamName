from rest_framework import serializers

from mentoring.models import Mentoring, Assignment
from tags.models import Tag
from tags.serializers import TagSerializer

class AssignmentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model=Assignment
        fields='__all__'
        read_only_fields=['created_at', 'updated_at']

class MentoringSerializer(serializers.HyperlinkedModelSerializer):
    assignments = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='assignment-detail'
        )
    tags = TagSerializer(
        many=True,
        required=False
        )

    class Meta:
        model = Mentoring
        fields = '__all__'
        read_only_fields=['created_at', 'updated_at']
        extra_kwargs = {
            'thumbnail': {'required': False}
        }

    def create(self, validated_data):

        tags_data=validated_data.pop('tags', None)

        mentees_data=validated_data.pop('mentees')
        mentoring=Mentoring.objects.create(**validated_data)

        for mentee_data in mentees_data:
            mentoring.mentees.add(mentee_data)

        if tags_data:
            for tag_data in tags_data:
                tag, created= Tag.objects.get_or_create(**tag_data)
                mentoring.tags.add(tag)

        return mentoring

    def update(self, instance, validated_data):
        if 'tags' in validated_data:
            tags_data=validated_data.pop('tags')
            instance.tags.set([])
            for tag_data in tags_data:
                new_tag, created=Tag.objects.get_or_create(**tag_data)
                instance.tags.add(new_tag)

        return super(MentoringSerializer, self).update(instance, validated_data)
