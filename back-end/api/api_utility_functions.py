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
from django.core import serializers
import csv
from django.contrib.auth.models import Group
from io import TextIOWrapper

from .models import *
from .serializers import VolunteerSerializer, EventSerializer, AttendeeSerializer
#from permissions import *

# Api Call that Deals With Creating New Event


def EventListPost(self, request, *args, **kwargs):

    serializer_class = EventSerializer

    req_name = request.data.__getitem__('name')
    req_date = request.data.__getitem__('date')
    req_csv  = request.FILES.get('csv')

    f = TextIOWrapper(req_csv.file, encoding=request.encoding)
    #reader = csv.reader(f, delimiter=',')

    event = Event.objects.create(name=req_name, date=req_date, csv=None)

    new_attendees = []
    captains = []

    # create a volunteer for every person in  csv
    # then create a corresponding attendee (specific for the new event) for each volunteer
    has_header = csv.Sniffer().has_header(f.read(1024))
    f.seek(0)  # rewind
    reader = csv.reader(f, delimiter=',')
    if has_header:
        next(reader)  # skip header row

    for row in reader:
        # What happens if volunteer is mostly the same, but one field is updated?
        volunteer = Volunteer.objects.create(
            first_name=row[0],
            last_name= row[1],
            city=row[2],
            state=row[3],
            phone=row[4],
            email=row[5].lower()
        )
        statusCode = 0
        if row[7] == "NO SHOW":
            statusCode = 0
        elif row[7] == "CANCEL":
            statusCode = 1
        elif row[7] == "OK":
            statusCode = 2

        if row[6] == "YES":
            attendee = Attendee.objects.create(volunteer=volunteer, team_captain=None,
                                               event=event, status=statusCode, assignment_id=row[8],
                                               job_descrip=row[9])
            captains.append(attendee)
            new_attendees.append(attendee)

        else:
            attendee = Attendee.objects.create(volunteer=volunteer, team_captain=None,
                                               event=event, status=statusCode, assignment_id=row[8],
                                               job_descrip=row[9])
            new_attendees.append(attendee)

    # match attendee with their team captain
    for a in new_attendees:
        found = False
        for cap in captains:
            if cap.assignment_id == a.assignment_id:
                found = True
                a.team_captain = cap.volunteer
                a.save()
        if not found:

            Attendee.objects.filter(event=event).delete()
            return JsonResponse({'error':'Error With CSV, no team captain assigned to group'})



    event.csv = req_csv
    event.save()

    serializer = serializer_class(event, context={'request':request})

    return Response(serializer.data)


# API Call that Returns List of attendees based upon the event
# and the team captain object

def FilteredAttendeeListGet(self):
    event = self.kwargs['event']
    captain = self.kwargs['teamcap']

    queryset = Attendee.objects.filter(event=event, team_captain=captain)
    return queryset

# API Call that returns a specific Event after name search
# passed in string of event name

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


# Api Call That Downloads the File Passed In
# Takes a filename string

def DownloadFileGet(self, request, file):

    file_path = "file/"+self.kwargs['file']+".csv"

    #get the event object
    specific_event = Event.objects.get(csv=file_path)

    file_name = specific_event.csv.name.split('/')[-1]

    response = HttpResponse(specific_event.csv, content_type='text/plain')
    response['Content-Disposition'] = 'attachment; filename=%s' %file_name

    return response
'''
def DeleteEventGet(self, request, event):
    attendee_list = Attendee.objects.filter(event=event)
    attendee_list.delete()
'''


# Api Call That Creates Usernames and passwords For All Team Captains,
# and then emails them their username & password combination.
# takes an event identifier

def NotifyTeamCaptainsGet(self, request, event):
    event = self.kwargs['event']
    subject = "You have been registered as a Team Captain for: " + Event.objects.get(pk=event).name

    emails = []

    #team_cap_group = Group.objects.get(name="Team Captain")

    # 0 corresponds to team captain's email, 1 to team captain's unique volunteer id
    # 3 to the team captain's first name

    for team_captain in Attendee.objects.filter(event=event)\
            .values_list('team_captain__email','team_captain__id', 'team_captain__first_name').distinct():
        password = User.objects.make_random_password()
        username = team_captain[0]

        if User.objects.filter(username=username).exists():
            user = User.objects.get(username=username)
            user.set_password(password)
            user.profile.volunteer = Volunteer.objects.get(pk=team_captain[1])
            user.profile.volunteer.save()
            user.save()
        else:
            vol = Volunteer.objects.get(pk=team_captain[1])
            new_user = User.objects.create_user(username=username, email=team_captain[0])
            new_user.set_password(password)
            new_user.profile.volunteer = vol
            new_user.profile.save()
            new_user.save()

        message = "Hello, " + team_captain[2] + ",\n \n Your username is:  " + username + \
                  "\n Your password is:  " + password + "\n \n \n Please login at [insert_url_here]"

        recipient = team_captain[0]
        from_email = "baattendence@gmail.com"

        email = (subject, message, from_email, [recipient])
        emails.append(email)

    send_mass_mail(tuple(emails), fail_silently=False)

    return Response(status=200)
