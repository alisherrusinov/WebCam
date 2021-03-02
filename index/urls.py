from django.urls import path, include
from .views import index, get_video, custom_admin
urlpatterns = [
    path('', index),
    path('get_video', get_video),
    path('all_videos', custom_admin)
]