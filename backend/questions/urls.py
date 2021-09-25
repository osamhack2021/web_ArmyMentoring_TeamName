from django.urls import include, path

from rest_framework.routers import DefaultRouter

from questions import views


router=DefaultRouter()
router.register('question', views.QuestionViewSet)
router.register('question_comment', views.QuestionCommentViewSet)

urlpatterns=[
    path('', include(router.urls)),
]
