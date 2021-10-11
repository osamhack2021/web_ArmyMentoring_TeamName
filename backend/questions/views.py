from rest_framework import viewsets

from questions.models import Question, QuestionComment
from questions.serializers import QuestionSerializer, QuestionCommentSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly

class QuestionViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset=Question.objects.all().order_by('created_at')
    serializer_class=QuestionSerializer

class QuestionCommentViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset=QuestionComment.objects.all()
    serializer_class=QuestionCommentSerializer
