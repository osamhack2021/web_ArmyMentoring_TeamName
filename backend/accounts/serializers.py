from rest_framework import serializers
from django.contrib.auth import authenticate

from users.models import User

# 회원가입
class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "username", 
            "email", 
            "password", 
            "nickname", 
            "profile_image", 
            "description", 
            )
        extra_kwargs={
            'profile_image':{'required': False}
        }
    
    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data["email"],
            username=validated_data["username"],
            password=validated_data["password"],
            nickname=validated_data["nickname"],
            profile_image=validated_data.pop("profile_image", None),
            description=validated_data["description"],
        )
        return user


# 접속 유지 중인지 확인
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


# 로그인
class LoginUserSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Unable to log in with provided credentials.")

