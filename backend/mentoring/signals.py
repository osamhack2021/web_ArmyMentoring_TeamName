from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Mentoring

@receiver( post_save, sender = Mentoring )
def Mentoring_post_save( sender, **kwargs ):
    user = kwargs[ 'instance' ].mentor
    user.experience_point += 50
    user.save( )
