from rest_framework import viewsets

from users.models import User, UserReview
from users.serializers import UserSerializer, UserReviewSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset=User.objects.all()
    serializer_class=UserSerializer

class UserReviewViewSet(viewsets.ModelViewSet):
    queryset= UserReview.objects.all()
    serializer_class=UserReviewSerializer
