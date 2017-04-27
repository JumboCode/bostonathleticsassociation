from django.core.mail import send_mass_mail
from django.db import IntegrityError
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import generics
from rest_framework.response import Response
from django.http import JsonResponse, HttpResponseForbidden
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.parsers import MultiPartParser
from django.http import HttpResponse, Http404
from django.core import serializers
from django.contrib.auth.decorators import login_required, user_passes_test

from api.api_utility_functions import *
import csv

from django.contrib.auth.models import Group
from io import TextIOWrapper

from .models import *
from .serializers import VolunteerSerializer, EventSerializer, AttendeeSerializer
#from permissions import *

# generic view patterns documented http://www.django-rest-framework.org/tutorial/3-class-based-views/

#returns all volunteers, ability to create a volunteer
class VolunteerList(generics.ListCreateAPIView):
    queryset = Volunteer.objects.all()
    serializer_class = VolunteerSerializer

#returns specific volunteer, ability to update, delete as well
class VolunteerDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Volunteer.objects.all()
    serializer_class = VolunteerSerializer

#returns all events, custom function for creation
class EventList(generics.ListCreateAPIView):
    parser_classes = (MultiPartParser,)
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    def post(self, request, *args, **kwargs):
        if request.user.is_authenticated and (request.user.is_staff or request.user.is_superuser):
            return EventListPost(self, request, *args, **kwargs)
        else:
            return HttpResponseForbidden()

#returns specific volunteer, ability to update, delete as well
class EventDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class GenerateReport(APIView):
    def get(self, request, event):
        return GenerateReportGet(self, request, event)

#returns all attendees, ability to create as well
class AttendeeList(generics.ListCreateAPIView):
    queryset = Attendee.objects.all()
    serializer_class = AttendeeSerializer

#returns attendee, ability to update, delete as well
class AttendeeDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Attendee.objects.all()
    serializer_class = AttendeeSerializer

class FilteredAttendeeList(generics.ListAPIView):
    serializer_class = AttendeeSerializer

    def get_queryset(self):
        return FilteredAttendeeListGet(self)



class SearchEvent(generics.ListAPIView):
    serializer_class = EventSerializer

    def get(self, request, name):
        return SearchEventGet(self, request, name)


class DownloadFile(APIView):

    def get(self, request, file):
        return DownloadFileGet(self, request, file)


class NotifyTeamCaptains(APIView):
    def get(self, request, event):
        return NotifyTeamCaptainsGet(self, request, event)
