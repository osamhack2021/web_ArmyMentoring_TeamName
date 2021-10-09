from rest_framework import viewsets, permissions, generics, status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny, IsAuthenticated

from django.contrib.auth import authenticate

from .serializers import CreateUserSerializer, LoginUserSerializer
from users.models import User
from users.serializers import UserSerializer

class RegistrationAPI(generics.GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = CreateUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(
            {
                "user": UserSerializer(
                    user, context=self.get_serializer_context()
                ).data,
                "token": Token.objects.create(user=user).key,
            }
        )
    
    # def get(self, request):
    #     serializer = UserSerializer(User.objects.all(), many=True)
    #     return Response(serializer.data)


class LoginAPI(generics.GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = LoginUserSerializer

    def post(self, request, *args, **kwargs):

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        
        if user is not None:
            token, created = Token.objects.get_or_create(user=user)

            return Response({"email": user.email, "Token": token.key})

        else:
            return Response([], status=status.HTTP_401_UNAUTHORIZED)

class LogoutAPI(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        request.user.auth_token.delete()
        data = {'Successfully logged out'}
        return Response(data=data, status=status.HTTP_200_OK)

class UserAPI(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user
