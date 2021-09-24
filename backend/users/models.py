from django.db import models
from django.contrib.auth.models import AbstractBaseUser

from core.models import AbstractTimeStampModel


class User(AbstractBaseUser, AbstractTimeStampModel):
    username=models.CharField(max_length=10, null=False)
    email=models.EmailField(null=False)
    nickname=models.CharField(max_length=20, null=False)
    profile_image=models.ImageField(null=False)
    experience_point=models.PositiveIntegerField(default=0)
    description=models.CharField(max_length=120, null=False)

class UserReview(AbstractTimeStampModel):
    mentor=models.ForeignKey(User, related_name="received_reviews", on_delete=models.CASCADE)
    mentee=models.ForeignKey(User, related_name="created_reviews", on_delete=models.CASCADE)
    content=models.TextField(null=False)
    