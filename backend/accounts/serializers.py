from rest_framework import serializers
from django.contrib.auth import authenticate

from users.models import User

# 회원가입
class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        field = (
            "username", 
            "email", 
            "password", 
            "nickname", 
            "profile_image", 
            "description", 
            )
    
    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data["email"],
            validated_data["username"],
            validated_data["password"],
            validated_data["nickname"],
            validated_data["profile_image"],
            validated_data["description"]
        )
        return user


# 접속 유지 중인지 확인
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        field = ("username", "email")


# 로그인
class LoginUserSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Unable to log in with provided credentials.")