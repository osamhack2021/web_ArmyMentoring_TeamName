"""config URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from rest_framework.routers import DefaultRouter

from users.views import UserViewSet ,UserReviewViewSet
from mentoring.views import MentoringViewSet, AssignmentViewSet
from portfolio.views import PortfolioViewSet, PortfolioItemViewSet, SpecificationCardViewSet
from questions.views import QuestionViewSet, QuestionCommentViewSet
from tags.views import TagViewSet


router=DefaultRouter(trailing_slash=False)
# user
router.register('user', UserViewSet)
router.register('user-review', UserReviewViewSet)
# mentoring
router.register('mentoring', MentoringViewSet)
router.register('assignment', AssignmentViewSet)
# portfolio
router.register('portfolio', PortfolioViewSet)
router.register('portfolio-item', PortfolioItemViewSet)
router.register('specification-card', SpecificationCardViewSet)
# questions
router.register('question', QuestionViewSet)
router.register('question-comment', QuestionCommentViewSet)
# tags
router.register('tag', TagViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('', include(router.urls)),
]
