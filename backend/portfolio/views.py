from rest_framework import viewsets

from portfolio.models import Portfolio, PortfolioItem, SpecificationCard
from portfolio.serializers import PortfolioSerializer, PortfolioItemSerializer, SpecificationCardSerializer


class PortfolioViewSet(viewsets.ModelViewSet):
    queryset=Portfolio.objects.all()
    serializer_class=PortfolioSerializer

class PortfolioItemViewSet(viewsets.ModelViewSet):
    queryset=PortfolioItem.objects.all()
    serializer_class=PortfolioItemSerializer

class SpecificationCardViewSet(viewsets.ModelViewSet):
    queryset=SpecificationCard.objects.all()
    serializer_class=SpecificationCardSerializer
