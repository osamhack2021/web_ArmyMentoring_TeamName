from django.urls import include, path

from rest_framework.routers import DefaultRouter

from portfolio import views


router=DefaultRouter()
router.register('portfolio', views.ProtfolioViewSet)
router.register('portfolio_item', views.PortfolioItemViewSet)
router.register('specification_card', views.SpecificationCardViewSet)


urlpatterns=[
    path('', include(router.urls)),
]
