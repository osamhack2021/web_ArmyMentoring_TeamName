from django.db import models

from core.models import AbstractTimeStampModel
from users.models import User
from portfolio.models import Portfolio

class Mentoring(AbstractTimeStampModel):
    mentor=models.ForeignKey(User, on_delete=models.SET_NULL)
    mentees=models.ManyToManyField(User)
    Portfolio=models.ForeignKey(Portfolio, on_delete=models.SET_NULL)
    title=models.CharField(max_length=120)
    deadline=models.DateTimeField(null=False)
    memo=models.TextField(null=False)
    thumbnail=models.ImageField(null=False)

class Assignment(AbstractTimeStampModel):
    mentoring=models.ForeignKey(Mentoring, on_delete=models.CASCADE)
    passed_mentees=models.ManyToManyField(User)
    title=models.CharField(max_length=120)
    content=models.TextField(null=False)
    deadline=models.DateTimeField(null=False)
