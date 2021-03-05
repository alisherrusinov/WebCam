from django.urls import path, include
from .views import record, get_video, custom_admin, video_page, index, finish

urlpatterns = [
    path('', index),
    path('record', record, name='record'),
    path('get_video', get_video),
    path('finish', finish),
    path('all_videos', custom_admin),
    path('video_page/<int:ident>', video_page),
]