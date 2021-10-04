from rest_framework import viewsets

from mentoring.models import Mentoring, Assignment
from mentoring.serializers import MentoringSerializer, AssignmentSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly

class MentoringViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset=Mentoring.objects.all()
    serializer_class=MentoringSerializer

class AssignmentViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset=Assignment.objects.all()
    serializer_class=AssignmentSerializer
