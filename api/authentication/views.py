from django.shortcuts import render
from django.contrib.auth.models import User, Group
from django.contrib.auth import logout, login
from rest_framework import viewsets, permissions, generics, status
from rest_framework.response import Response
from .serializers import UserSerializer, GroupSerializer, LoginSerializer
from django.middleware import csrf

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

class UserAPIView(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]


class LoginAPIView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        login(request, user)
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": request.META.get('CSRF_COOKIE', None)
        })


class LogoutAPIView(generics.GenericAPIView):
    def get(self, request, format=None):
        # simply delete the token to force a login
        logout(request)
        return Response(status=status.HTTP_200_OK)

class CheckLoginAPIView(generics.GenericAPIView):
    def get(self, request, format=None):
        return Response({
            "user": UserSerializer(request.user, context=self.get_serializer_context()).data,
        })

class EditUserAPIView(generics.GenericAPIView):
    def post(self, request, *args, **kwargs):
        user = request.user
        if (user.is_authenticated):
            user.email = request.data['email']
            user.save()
            return Response({
                "user": UserSerializer(request.user, context=self.get_serializer_context()).data,
            })
        else:
            return Response(status=status.HTTP_200_OK)