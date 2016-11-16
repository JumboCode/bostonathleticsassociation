from django.conf.urls import url, include
from rest_framework.urlpatterns import format_suffix_patterns


from . import views

urlpatterns = [
#    url(r'^', include('rest_framework.urls', namespace='rest_framework')),
    url(r'volunteers$', views.VolunteerList.as_view()),
    url(r'volunteers/(?P<pk>[0-9]+)/$', views.VolunteerDetail.as_view()),
    url(r'events$', views.EventList.as_view()),
    url(r'events/(?P<pk>[0-9]+)/$', views.EventDetail.as_view()),
    url(r'attendees$', views.AttendeeList.as_view()),
    url(r'attendees/(?P<pk>[0-9]+)/$', views.AttendeeDetail.as_view()),
]


urlpatterns = format_suffix_patterns(urlpatterns)