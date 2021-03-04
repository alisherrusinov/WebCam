from django.urls import path, include
from .views import index, get_video, custom_admin, video_page
urlpatterns = [
    path('', index),
    path('get_video', get_video),
    path('all_videos', custom_admin),
    path('video_page/<int:ident>', video_page),
]