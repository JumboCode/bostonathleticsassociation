from django.core.mail import send_mass_mail, send_mail
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
import re
from django.contrib.auth.models import Group
from io import TextIOWrapper
from django.conf import settings
from smtplib import SMTPException

from .models import *
from .serializers import VolunteerSerializer, EventSerializer, AttendeeSerializer
#from permissions import *

# Api Call that Deals With Creating New Event


def EventListPost(self, request, *args, **kwargs):

    serializer_class = EventSerializer
    name = request.data.__getitem__('name')
    req_name = re.sub('[^A-Za-z0-9 ]+', '', name)
    req_date = request.data.__getitem__('date')
    req_csv  = request.FILES.get('csv')

    f = TextIOWrapper(req_csv.file, encoding=request.encoding)
    #reader = csv.reader(f, delimiter=',')


    event = Event.objects.create(name=req_name, date=req_date, csv=None)

    new_attendees = []
    captains = []

    try:
        has_header = csv.Sniffer().has_header(f.read(1024))
        f.seek(0)  # rewind
        reader = csv.reader(f, delimiter=',')

        if has_header:
            next(reader)  # skip header row
        else:
            event.delete()
            return JsonResponse({'error': "error with finding csv header"})

        for row in reader:

            if (len(row) != 10):
                Attendee.objects.filter(event=event).delete()
                event.delete()
                return JsonResponse({'error': "Error with CSV: Missing Row"})

            volunteer = Volunteer.objects.create(first_name=row[0],last_name= row[1],city=row[2],state=row[3],
                                                phone=row[4], email=row[5].lower())
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

            elif row[6] == "NO":
                attendee = Attendee.objects.create(volunteer=volunteer, team_captain=None,
                                                   event=event, status=statusCode, assignment_id=row[8],
                                                   job_descrip=row[9])
                new_attendees.append(attendee)

            # error check to make sure that CSV only YES or NO for CAPTAIN Field
            else:
                Attendee.objects.filter(event=event).delete()
                event.delete()
                return JsonResponse({'error': "Error with CSV, Team Captain field is not 'YES' or 'NO'"})

        #check to make sure that no two team captains have the same assignment id
        for cap in captains:
            for c in captains:
                if cap != c:
                    if cap.assignment_id == c.assignment_id:
                        Attendee.objects.filter(event=event).delete()
                        event.delete()
                        return JsonResponse({'error': 'Error With CSV, 2 Two team captains with same assignment id: ' + c.assignment_id })

        # match attendee with their team captain
        # ensure that each assignment id has a captain associated with it
        for a in new_attendees:
            found = False
            for cap in captains:
                if cap.assignment_id == a.assignment_id:
                    found = True
                    a.team_captain = cap.volunteer
                    a.save()
            if not found:
                Attendee.objects.filter(event=event).delete()
                event.delete()
                return JsonResponse({'error':'Error With CSV, no team captain assigned to group ' + a.assignment_id})

        event.csv = req_csv
        event.save()
        serializer = serializer_class(event, context={'request':request})

        return Response(serializer.data)

    # Generic CSV ERROR
    except csv.Error:
        Attendee.objects.filter(event=event).delete()
        event.delete()
        return JsonResponse({'error': 'Error with CSV'})



def GenerateReportGet(self, request, event):
    event = Event.objects.get(pk=self.kwargs['event'])
    # Create the HttpResponse object with the appropriate CSV header.
    response = HttpResponse(content_type='text/csv')
    file_name = "report_" + event.name
    response['Content-Disposition'] = 'attachment; filename="' + file_name + ".csv" + '"'

    writer = csv.writer(response)
    writer.writerow(['First Name', 'Last Name', 'City', 'State', 'Phone', 'Email', 'Captain', 'Status', 'AssignmentID', 'Job Description'])

    for a in Attendee.objects.filter(event=event):
        if a.status == 0:
            statusCode = "NO SHOW"
        elif a.status == 1:
            statusCode = "CANCEL"
        elif a.status == 2:
            statusCode = "OK"
        if a.volunteer.team_captain == a.volunteer:
            is_cap = "YES"
        else:
            is_cap = "NO"
        writer.writerow([a.volunteer.first_name, a.volunteer.last_name, a.volunteer.city, a.volunteer.state,
                         a.volunteer.phone, a.volunteer.email, is_cap, statusCode, a.assignment_id, a.job_descrip])

    return response

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

    try:
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

            message = "Hello " + team_captain[2] + ",\n \n You are registered as a team captain for: " + \
                      Event.objects.get(pk=event).name + " \n \n Your username is:  " + username + \
                      "\n Your password is:  " + password + "\n \n \n Please follow the instructions to sign in here: " + \
                      settings.DOMAIN + 'guide/'

            recipient = team_captain[0]
            from_email = settings.FROM_EMAIL

            try:
                send_mail(subject, message, from_email, [recipient], fail_silently=False)
            except SMTPException:
                return JsonResponse({'error':'Error with sending email', 'recipient': recipient, 'subject':subject}, status=500)

            return Response(status=200)

    except Exception:
        return JsonResponse({'erorr': 'Error with generating emails'}, status=500)

