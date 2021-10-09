from rest_framework import serializers

from questions.models import Question, QuestionComment


class QuestionCommentSerializer(serializers.HyperlinkedModelSerializer):
    
    class Meta:
        model = QuestionComment
        fields='__all__'
        extra_kwargs={
            'user':{'required': True},
            'liked_user':{'required': False}
        }

class QuestionSerializer(serializers.HyperlinkedModelSerializer):
    question_comments = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='questioncomment-detail'
        )

    class Meta:
        model = Question
        fields = '__all__'
        extra_kwargs={
            'user':{'required': True},
            'liked_user':{'required': False}
        }
