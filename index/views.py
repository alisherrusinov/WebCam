from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
import webcam.settings as settings
from .models import VideoModel
import os
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
        id = len(os.listdir(directory)) + 1
        filename = f'temp{id}.webm'
        videos_path = os.path.join(directory, filename)
        print(request.FILES)
        with open(videos_path, 'wb+') as destination:
            for chunk in request.FILES['voice'].chunks():
                destination.write(chunk)
        username = request.user.username
        video = VideoModel(ident=id, file_name=filename, username=username)
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
    all_videos = VideoModel.objects.all()
    return render(request, 'index/custom_admin.html', {'videos' : all_videos})

def video_page(request, ident):
    video = get_object_or_404(VideoModel, ident=ident)
    return render(request, 'index/video_page.html', {'video': video})
