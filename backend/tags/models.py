from django.db import models

from core.models import AbstractTimeStampModel


class Tag(AbstractTimeStampModel):
    name=models.CharField(max_length=16, unique=True)