"""api URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
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
from django.urls import path, re_path
from django.conf.urls import url, include
from rest_framework import routers
from api.authentication.views import UserViewSet, UserAPIView, LoginAPIView, LogoutAPIView, CheckLoginAPIView, EditUserAPIView

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('frontend.urls')),
    path('users/', include(router.urls)),
    path('edit-user/', EditUserAPIView.as_view()),
    # AUTH URLs #
    path('login/', LoginAPIView.as_view()),
    path('logout/', LogoutAPIView.as_view()),
    path('check-login/', CheckLoginAPIView.as_view()),
    #url(r'^', include('django.contrib.auth.urls')),
    re_path(r'^(?:.*)/?$', include('frontend.urls')),
]
