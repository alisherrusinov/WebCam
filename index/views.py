from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
import webcam.settings as settings
from .models import VideoModel
import os
import glob
# Create your views here.

def index(request):
    return render(request, 'index/index.html')

def record(request):
    return render(request, 'index/record.html')

def finish(request):
    return render(request, 'index/finish.html')

@csrf_exempt
def get_video(request):
    """
    Функция которая распознает речь пользователя
    Приходят blob файлы через POST запрос.
    Возвращается текст.
    """
    if (request.method == 'POST'):
        directory = settings.VIDE0_DIR
        id = len(glob(f"{directory}/*.mp4")) +1
        filename = f'temp{id}.webm'
        videos_path = os.path.join(directory, filename)
        print(request.FILES)
        with open(videos_path, 'wb+') as destination:
            for chunk in request.FILES['voice'].chunks():
                destination.write(chunk)
        os.popen(f'ffmpeg -i {videos_path} -strict -2 {directory}/temp{id}.mp4; rm {videos_path}')
        filename = f'temp{id}.mp4'
        username = request.user.username
        full_name = request.user.get_full_name()
        video = VideoModel(ident=id, file_name=filename, username=username, full_name=full_name)
        video.save()

        return HttpResponse('OK')

@csrf_exempt
def set_status(request,ident):
    if(request.method == 'POST'):
        print(request.POST)
        status, ident = request.POST.get('status'), request.POST.get('ident')
        print(ident)
        model = VideoModel.objects.get(ident=ident)
        model.status = status
        model.save(update_fields=['status'])
        return HttpResponse('OK')

def custom_admin(request):
    if(request.user.is_authenticated()):
        if(request.user.username in settings.ADMINS_LIST):
            all_videos = VideoModel.objects.all()
            max_video = len(all_videos)
            return render(request, 'index/custom_admin.html', {'videos': all_videos, 'max_videos': max_video})
        else:
            return HttpResponse(404)
    else:
        return HttpResponse(404)

def video_page(request, ident):
    video = get_object_or_404(VideoModel, ident=ident)
    all_videos = VideoModel.objects.all()
    max_video = len(all_videos)
    return render(request, 'index/video_page.html', {'video': video, 'max_videos':max_video})
