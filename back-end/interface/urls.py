from django.contrib import admin
from django.conf.urls import url, include

from . import views

urlpatterns = [
    url(r'^main/$', views.main, name='main'),
    url(r'^upload_csv$', views.upload_csv, name='upload_csv'),
    url(r'^list$', views.list, name='list')
]# ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)