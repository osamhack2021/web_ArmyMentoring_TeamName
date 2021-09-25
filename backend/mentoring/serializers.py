from rest_framework import serializers

from mentoring.models import Mentoring, Assignment


class AssignmentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model=Assignment
        fields=[
            'mentoring',
            'passed_mentees',
            'title',
            'content',
            'deadline',
        ]

class MentoringSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model=Mentoring
        fields=[
            'mentor', 'mentees',
            'portfolio',
            'tags',
            'title',
            'start_date', 'end_date',
            'memo',
            'thumbnail',
            'assignments',
            ]
