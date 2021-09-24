from django.db import models

# Create your models here.

class AbstractTimeStampModel(models.Model):
    created_at=models.DateTimeField(auto_now=True)
    updated_at=models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract=True