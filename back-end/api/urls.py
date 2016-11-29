from django.conf.urls import url, include
from rest_framework.urlpatterns import format_suffix_patterns


from . import views


urlpatterns = [
#    url(r'^', include('rest_framework.urls', namespace='rest_framework')),
    url(r'volunteers/$', views.VolunteerList.as_view(), name="volunteer-list"),
    url(r'volunteers/(?P<pk>[0-9]+)/$', views.VolunteerDetail.as_view(), name="volunteer-detail"),
    url(r'events/$', views.EventList.as_view(), name="event-list"),
    url(r'events/(?P<pk>[0-9]+)/$', views.EventDetail.as_view(), name="event-detail"),
    url(r'attendees/$', views.AttendeeList.as_view(), name="attendee-list"),
    url(r'attendees/(?P<pk>[0-9]+)/$', views.AttendeeDetail.as_view(), name="attendee-detail"),
    url(r'attendees/event/(?P<event>[-\w]+)/teamcap/(?P<teamcap>[-\w]+)', views.FilteredAttendeeList.as_view(), name="filtered-attendees"),
]

urlpatterns = format_suffix_patterns(urlpatterns)