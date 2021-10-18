from rest_framework import serializers

from mentoring.models import Mentoring, Assignment
from tags.models import Tag
from tags.serializers import TagSerializer
from users.models import User

class AssignmentSerializer(serializers.HyperlinkedModelSerializer):
    passed_mentees=serializers.HyperlinkedRelatedField(
        many=True,
        required=False,
        view_name='user-detail',
        queryset=User.objects.all()
    )

    class Meta:
        model=Assignment
        fields='__all__'
        read_only_fields=['created_at', 'updated_at']

    def create(self, validated_data):
        passed_mentees=validated_data.pop('passed_mentees')

        assignment=Assignment.objects.create(**validated_data)

        if passed_mentees:
            for passed_mentee in passed_mentees:
                assignment.mentees.add(passed_mentee)

        return assignment

    def update(self, instance, validated_data):
        if 'passed_mentees' in validated_data:
            passed_mentees_data=validated_data.pop('passed_mentees')
            instance.passed_mentees.set(passed_mentees_data)
            # for passed_mentee_data in passed_mentees_data:
            #     new_tag=User.objects.get(**passed_mentee_data)
            #     instance.passed_mentees.add(new_tag)

        return super(AssignmentSerializer, self).update(instance, validated_data)

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
    mentees=serializers.HyperlinkedRelatedField(
        many=True,
        required=False,
        view_name='user-detail',
        queryset=User.objects.all()
    )

    class Meta:
        model = Mentoring
        fields = '__all__'
        read_only_fields=['created_at', 'updated_at']
        extra_kwargs = {
            'thumbnail': {'required': False},
            'description': {'required': False},
            'memo': {'required': False},
        }

    def create(self, validated_data):
        tags_data=validated_data.pop('tags', None)
        mentees_data=validated_data.pop('mentees')

        mentoring=Mentoring.objects.create(**validated_data)

        if mentees_data:
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
