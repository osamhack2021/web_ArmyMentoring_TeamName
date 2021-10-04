from rest_framework import viewsets

from portfolio.models import Portfolio, PortfolioItem, SpecificationCard
from portfolio.serializers import PortfolioSerializer, PortfolioItemSerializer, SpecificationCardSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly

class PortfolioViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset=Portfolio.objects.all()
    serializer_class=PortfolioSerializer

class PortfolioItemViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset=PortfolioItem.objects.all()
    serializer_class=PortfolioItemSerializer

class SpecificationCardViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset=SpecificationCard.objects.all()
    serializer_class=SpecificationCardSerializer
