from django.shortcuts import render
from rest_framework import permissions

def index(request):
    return render(request, 'frontend/index.html')

def profile(request):
    return render(request, 'frontend/profile.html')