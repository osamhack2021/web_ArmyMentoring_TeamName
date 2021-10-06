from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Question, QuestionComment

@receiver( post_save, sender = Question )
def Question_post_save( sender, **kwargs ):
    user = kwargs[ 'instance' ].user
    user.experience_point += 10
    user.save( )

@receiver( post_save, sender = QuestionComment )
def QuestionComment_post_save( sender, **kwargs ):
    user = kwargs[ 'instance' ].user
    user.experience_point += 10
    user.save( )