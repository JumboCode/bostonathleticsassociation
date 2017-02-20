from django.core.mail import send_mass_mail
from django.db import IntegrityError
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import generics
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.parsers import MultiPartParser
from django.http import HttpResponse, Http404
from .csv_to_json2 import parse_csv
from .upload_json2 import add_volunteer, parse_json
from django.core import serializers
import csv

from django.contrib.auth.models import Group
from io import TextIOWrapper

from django.contrib.auth.models import Group
from io import TextIOWrapper

from .models import *
from .serializers import VolunteerSerializer, EventSerializer, AttendeeSerializer
#from permissions import *

def EventListPost(self, request, *args, **kwargs):
    serializer_class = EventSerializer

    req_name = request.data.__getitem__('name')
    req_date = request.data.__getitem__('date')
    req_csv  = request.FILES.get('csv')

    f = TextIOWrapper(req_csv.file, encoding=request.encoding)
    reader = csv.reader(f, delimiter=',')

    event = Event.objects.create(name=req_name, date=req_date, csv=None)

    new_attendees = []
    captains = []

    for row in reader:
        print(row)
        volunteer = Volunteer.objects.get_or_create(
            name=row[0],
            status=row[1],
            city=row[2],
            state=row[3],
            phone=row[4],
            email=row[5],
            years_of_service=row[6],
            jacket=row[7],
            jacket_size=row[8],
            team_captain=row[9]
        )

        if row[9] == "TRUE":
            attendee = Attendee.objects.create(volunteer=volunteer, team_captain=None, 
                event=event, assignment_id=row[10])
            captains.append(attendee)

        else:
            attendee = Attendee.objects.create(volunteer=a, team_captain=None,              
                                               event=event, assignment_id=row[10])
            new_attendees.append(attendee)

    for a in new_attendees:
        for cap in captains:
            if cap.assignment_id == a.assignment_id:
                # need to check what happens if two captains have the same name - 
                # use assignment id to resolve?
                a.team_captain = Volunteer.objects.get(cap_name=cap.name)
                a.save()

    event.csv = req_csv
    event.save()

    serializer = serializer_class(event, context={'request':request})

    return Response(serializer.data)

def FilteredAttendeeListGet(self):
    event = self.kwargs['event']
    captain = self.kwargs['teamcap']

    queryset = Attendee.objects.filter(event=event, team_captain=captain)
    return queryset

def SearchEventGet(self, request, name):
    serializer_class = EventSerializer

    lookup_field = 'name'
    name = self.kwargs['name']

    try:
        event = Event.objects.get(name=name)
        csv_path = event.csv
        serializer = serializer_class(event, context={'request':request})

    except ObjectDoesNotExist:
        return Response(status=422)

    return Response(serializer.data)

def DownloadFileGet(self, request, file):
    file_path = "file/"+self.kwargs['file']+".csv"
    specific_event = Event.objects.get(csv=file_path)

    #get the event object with the exact file path requested

    file_name = specific_event.csv.name.split('/')[-1]
    response = HttpResponse(specific_event.csv, content_type='text/plain')
    response['Content-Disposition'] = 'attachment; filename=%s' %file_name

    return response

def NotifyTeamCaptainsGet(self, request, event):
    event = self.kwargs['event']

    subject = "You have been registered as a Team Captain for: " + Event.objects.get(pk= event).name

    emails = []

    team_cap_group = Group.objects.get(name="Team Captain")

    # 0 corresponds to team captain's name, 1 to team captain's email
    for team_captain in Attendee.objects.filter(event=event)\
            .values_list('team_captain__name', 'team_captain__email').distinct():

        password = User.objects.make_random_password()
        username = team_captain[0].replace(" ", ".")

        if User.objects.filter(username=username).exists():
            user = User.objects.get(username=username)
            user.set_password(password)
        else:
            new_user = User.objects.create_user(username=username, email=team_captain[1], password=password,)
            team_cap_group.user_set.add(new_user)

        message = "Hello, " + team_captain[0] + ",\n \n Your username is:  " + username + \
                  "\n Your password is:  " + password + "\n \n \n Please login at [insert_url_here]"

        recipient = team_captain[1]
        from_email = "baattendence@gmail.com"

        email = (subject, message, from_email, [recipient])
        emails.append(email)

    send_mass_mail(tuple(emails), fail_silently=False)

    return Response(status=200)
