from rest_framework import serializers

from mentoring.models import Mentoring, Assignment


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

    class Meta:
        model = Mentoring
        fields = '__all__'
        read_only_fields=['created_at', 'updated_at']
        extra_kwargs={
            'tags':{'required': False}
        }