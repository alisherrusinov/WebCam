from django.db import models

# Create your models here.
class VideoModel(models.Model):
    ident = models.IntegerField(verbose_name='Номер файла в папке')
    file_name = models.TextField(default='temp1.webm')
