from rest_framework import serializers
from users.models import User, UserReview

class UserReviewSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = UserReview
        fields = ['mentor', 'mentee', 'content']
        read_only_fields = []

class UserSerializer(serializers.HyperlinkedModelSerializer):

    received_reviews = UserReviewSerializer()
    created_reviews = UserReviewSerializer()

    class Meta:
        model = User
        fields = ['username', 'email', 'nickname', 'profile_image', 'experience_point', 'description', 'received_reviews', 'created_reviews']
        read_only_fields = ['experience_point', 'received_reviews', 'created_reviews' ]
        extra_kwargs = {'profile_image': {'required': False}}