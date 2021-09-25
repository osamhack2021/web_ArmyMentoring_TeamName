from django.urls import path, include

from rest_framework.routers import DefaultRouter

from mentoring import views


router=DefaultRouter()
router.register('mentoring', views.MentoringViewSet)
router.register('assignment', views.AssignmentViewSet)

urlpatterns = [
    path('', include(router.urls))
]
