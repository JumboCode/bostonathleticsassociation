from django.conf.urls import url, include
from rest_framework.urlpatterns import format_suffix_patterns


from . import views

urlpatterns = [
#    url(r'^', include('rest_framework.urls', namespace='rest_framework')),
    url(r'volunteers$', views.VolunteerList.as_view()),
    url(r'volunteers/(?P<pk>[0-9]+)/$', views.VolunteerDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)