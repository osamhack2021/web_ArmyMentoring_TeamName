from rest_framework import viewsets

from questions.models import Question, QuestionComment
from questions.serializers import QuestionSerializer, QuestionCommentSerializer

class QuestionViewSet(viewsets.ModelViewSet):
    queryset=Question.objects.all()
    serializer_class=QuestionSerializer

class QuestionCommentViewSet(viewsets.ModelViewSet):
    queryset=QuestionComment.objects.all()
    serializer_class=QuestionCommentSerializer
