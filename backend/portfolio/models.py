from django.db import models

from core.models import AbstractTimeStampModel
from users.models import User


class Portfolio(AbstractTimeStampModel):
    user=models.ForeignKey(User, on_delete=models.CASCADE)
    title=models.CharField(max_length=120, null=False)

class PortfolioItem(AbstractTimeStampModel):
    Portfolio=models.ForeignKey(Portfolio, on_delete=models.CASCADE)
    title=models.CharField(max_length=120, null=False)
    content=models.TextField(null=False)
    order=models.PositiveSmallIntegerField(null=False)

class SpecificationCard(AbstractTimeStampModel):
    Portfolio=models.ForeignKey(Portfolio, on_delete=models.CASCADE)
    title=models.CharField(max_length=120, null=False)
    description=models.TextField(null=False)
