from rest_framework import serializers

from questions.models import Question, QuestionComment
from users.serializers import UserSerializer

class QuestionCommentSerializer(serializers.HyperlinkedModelSerializer):
    
    class Meta:
        model = QuestionComment
        fields='__all__'

class QuestionSerializer(serializers.HyperlinkedModelSerializer):
    question_comments = QuestionCommentSerializer(many=True, read_only=True)
    
    class Meta:
        model = Question
        fields = '__all__'
        extra_kwargs={
            'user':{'required': True}
        }