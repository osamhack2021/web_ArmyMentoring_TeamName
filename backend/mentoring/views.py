from rest_framework import viewsets

from mentoring.models import Mentoring, Assignment
from mentoring.serializers import MentoringSerializer, AssignmentSerializer


class MentoringViewSet(viewsets.ModelViewSet):
    queryset=Mentoring.objects.all()
    serializer_class=MentoringSerializer

class AssignmentViewSet(viewsets.ModelViewSet):
    queryset=Assignment.objects.all()
    serializer_class=AssignmentSerializer
