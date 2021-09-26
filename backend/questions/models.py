from django.db import models
from django.db.models.deletion import CASCADE

from core.models import AbstractTimeStampModel
from users.models import User


class Question(AbstractTimeStampModel):
    user=models.ForeignKey(User, on_delete=CASCADE)
    liked_user=models.ManyToManyField(User, related_name="liked_questions")
    title=models.CharField(max_length=120, null=False)
    content=models.TextField(null=False)

    def __str__(self):
        return self.title

class QuestionComment(AbstractTimeStampModel):
    user=models.ForeignKey(User, on_delete=CASCADE)
    question=models.ForeignKey(Question, on_delete=models.CASCADE)
    liked_user=models.ManyToManyField(User, related_name="liked_question_comments")
    content=models.TextField(null=False)

    def __str__(self):
        return self.title
    