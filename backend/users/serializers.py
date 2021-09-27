from rest_framework import serializers
from users.models import User, UserReview

class UserReviewSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = UserReview
        fields = ['mentor', 'mentee', 'content']

class UserSerializer(serializers.HyperlinkedModelSerializer):

    user_reviews = UserReviewSerializer()

    class Meta:
        model = User
        fields = ['username', 'email', 'nickname', 'profile_image', 'experience_point', 'description', 'received_reviews', 'created_reviews']
