from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
import webcam.settings as settings
import os
# Create your views here.
def index(request):
    return render(request, 'index/index.html')

@csrf_exempt
def get_video(request):
    """
    Функция которая распознает речь пользователя
    Приходят blob файлы через POST запрос.
    Возвращается текст.
    """
    if (request.method == 'POST'):
        directory = settings.VIDE0_DIR
        filename = f'temp{len(os.listdir(directory)) + 1}.webm'
        temp_path = os.path.join(directory, filename)
        print(request.FILES)
        with open(temp_path, 'wb+') as destination:
            for chunk in request.FILES['voice'].chunks():
                destination.write(chunk)

        return HttpResponse('OK')
