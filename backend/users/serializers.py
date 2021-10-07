from rest_framework import serializers

from users.models import User, UserReview


class UserReviewSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = UserReview
        fields='__all__'
        read_only_fields = ['created_at', 'updated_at']

class UserSerializer(serializers.HyperlinkedModelSerializer):
    received_reviews=serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='userreview-detail'
    )
    created_reviews=serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='userreview-detail'
    )
    portfolio = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='portfolio-detail'
    )
    opened_mentoring = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='mentoring-detail'
    )
    participated_mentoring = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='mentoring-detail'
    )

    level = serializers.SerializerMethodField(method_name='get_level')

    def get_level(self, obj):
        return obj.experience_point // 100

    class Meta:
        model = User
        exclude=['password', 'user_permissions']
        read_only_fields = [
            'created_at', 'updated_at', 
            'last_login',
            'experience_point',
            'is_active', 'is_admin', 'is_superuser', 'is_staff'
         ]
        extra_kwargs = {
            'profile_image': {'required': False},
            }
