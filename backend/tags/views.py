from rest_framework import viewsets

from tags.models import Tag
from tags.serializers import TagSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly

class TagViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset=Tag.objects.all()
    serializer_class=TagSerializer