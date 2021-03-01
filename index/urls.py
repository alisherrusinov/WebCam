from django.urls import path, include
from .views import index, get_video
urlpatterns = [
    path('', index),
    path('get_video', get_video),
]