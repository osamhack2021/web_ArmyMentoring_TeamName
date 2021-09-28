from rest_framework import serializers

from users.models import User, UserReview


class UserReviewSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = UserReview
        fields='__all__'
        read_only_fields = ['created_at', 'updated_at']
        depth=1

class UserSerializer(serializers.HyperlinkedModelSerializer):
    received_reviews = UserReviewSerializer(many=True, read_only=True)
    created_reviews = UserReviewSerializer(many=True, read_only=True)

    class Meta:
        model = User
        exclude=['password']
        read_only_fields = [
            'created_at', 'updated_at', 
            'last_login',
            'experience_point',
            'is_active', 'is_admin', 'is_superuser', 'is_staff'
         ]
        extra_kwargs = {
            'profile_image': {'required': False},
            'description': {}
            }
        depth=1