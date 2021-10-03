from rest_framework import viewsets

from users.models import User, UserReview
from users.serializers import UserSerializer, UserReviewSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly

class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset=User.objects.all()
    serializer_class=UserSerializer

class UserReviewViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset= UserReview.objects.all()
    serializer_class=UserReviewSerializer
