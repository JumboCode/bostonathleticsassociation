from django.core.mail import send_mail
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


from .models import *
from .serializers import VolunteerSerializer, EventSerializer, AttendeeSerializer
#from permissions import *

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
    parser_classes = (MultiPartParser,)
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    def post(self, request, *args, **kwargs):
        serializer_class = EventSerializer

        req_name = request.data.__getitem__('name')
        req_date = request.data.__getitem__('date')
        req_csv  = request.FILES.get('csv')

        f = TextIOWrapper(req_csv.file, encoding=request.encoding)
        reader = csv.reader(f, delimiter=',')

        event = Event.objects.create(name=req_name, date=req_date, csv=None)
        new_attendees = []

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
                jacket_size=row[8]
            )

            team_cap_name = row[9] or None

            attendee = Attendee.objects.create(volunteer=volunteer[0], team_captain=None, event=event, team_cap_name=team_cap_name)
            new_attendees.append(attendee)

        for a in new_attendees:
            cap_name = a.team_cap_name
            if cap_name:
                try:
                    cap = Volunteer.objects.get(name=cap_name)
                    a.team_captain = cap
                    a.save()
                except Volunteer.DoesNotExist:
                    pass
        event.csv = req_csv
        event.save()

        serializer = serializer_class(event, context={'request':request})

        return Response(serializer.data)



#returns specific volunteer, ability to update, delete as well
class EventDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class AttendeeList(generics.ListCreateAPIView):
    queryset = Attendee.objects.all()
    serializer_class = AttendeeSerializer

    #returns specific volunteer, ability to update, delete as well

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

         queryset = Attendee.objects.filter(event=event, team_captain=captain)
         return queryset


class SearchEvent(generics.ListAPIView):
    serializer_class = EventSerializer

    def get(self, request, name):
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


class DownloadFile(APIView):

    def get(self, request, file):
        file_path = "file/"+self.kwargs['file']+".csv"
        specific_event = Event.objects.get(csv=file_path)

        #get the event object with the exact file path requested

        file_name = specific_event.csv.name.split('/')[-1]
        response = HttpResponse(specific_event.csv, content_type='text/plain')
        response['Content-Disposition'] = 'attachment; filename=%s' %file_name

        return response



class NotifyTeamCaptains(APIView):

    def get(self, request, event):
        event = self.kwargs['event']

        subject = "You have been registered as a Team Captain for: " + Event.objects.get(pk= event).name

        emails = []

      # team_cap_group = Group.objects.get(name="Team Captain")

        for team_captain in Attendee.objects.filter(event=event)\
                .values_list('team_captain__name', 'team_captain__email').distinct():
            
            # 0 corresponds to team captain's name, 1 to team captain's email
            try:
                password = User.objects.make_random_password()
                username = team_captain[0].replace(" ", ".")

                new_user = User.objects.create_user(username=username, email=team_captain[1], password=password,)

                #team_cap_group.user_set.add(new_user)

                message = "Hello, " + team_captain[0] + ",\n \n Your username is:  " + username + \
                          "\n Your password is:  " + password + "\n \n \n Please login at [insert_url_here]"

                recipient = team_captain[1]
                email = "baattendence@gmail.com"

                emails.append(subject, message, email, [recipient])

            except IntegrityError:
                user = User.objects.get(username=username)
                user.set_password(password)

                message = "Hello, " + team_captain[0] + ",\n \n Your username is:  " + username + \
                          "\n Your password is:  " + password + "\n \n \n Please login at [insert_url_here]"

                recipient = team_captain[1]
                email = "baattendence@gmail.com"

                emails.append(subject, message, email, [recipient])
                pass

        return Response(status=200)
