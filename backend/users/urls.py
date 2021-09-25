from django.urls import include, path

from rest_framework.routers import DefaultRouter

from users import views


router=DefaultRouter()
router.register('user', views.UserViewSet)
router.register('user_review', views.UserReviewViewSet)

urlpatterns=[
    path('', include(router.urls)),
]