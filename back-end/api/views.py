from .models import *
from .serializers import VolunteerSerializer, EventSerializer, AttendeeSerializer
from rest_framework import generics
import sys

# generic view patterns documented http://www.django-rest-framework.org/tutorial/3-class-based-views/

#returns all volunteers
class VolunteerList(generics.ListCreateAPIView):
    queryset = Volunteer.objects.all()
    serializer_class = VolunteerSerializer

#returns specific volunteer, ability to update, delete as well
class VolunteerDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Volunteer.objects.all()
    serializer_class = VolunteerSerializer

class EventList(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

#returns specific volunteer, ability to update, delete as well
class EventDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class AttendeeList(generics.ListCreateAPIView):
    serializer_class = AttendeeSerializer
    queryset = Attendee.objects.all()

class AttendeeDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Attendee.objects.all()
    serializer_class = AttendeeSerializer


class FilteredAttendeeList(generics.ListAPIView):
    serializer_class = AttendeeSerializer

    def get_queryset(self):

         event = self.kwargs['event']
         captain = self.kwargs['teamcap']

         queryset = Attendee.objects.filter(event__name__contains=event, team_captain=captain)
         return queryset
