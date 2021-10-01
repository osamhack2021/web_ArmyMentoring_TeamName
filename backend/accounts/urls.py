from django.urls import path, include
from .views import  RegistrationAPI, LoginAPI, UserAPI

urlpatterns =[
    path("register", RegistrationAPI.as_view()),
    path("login", LoginAPI.as_view()),
    path("user", UserAPI.as_view()),
]