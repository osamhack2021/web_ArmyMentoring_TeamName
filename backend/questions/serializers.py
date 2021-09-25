from rest_framework import serializers
from questions.models import Question, QuestionComment

class QuestionCommentSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = QuestionComment
        fields = ['user', 'question', 'liked_user', 'content']

class QuestionSerializer(serializers.HyperlinkedModelSerializer):

    question_comments = QuestionCommentSerializer(many=True)

    class Meta:
        model = Question
        fields = ['user', 'liked_user', 'title', 'content', 'question_comments']