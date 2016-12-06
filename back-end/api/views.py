from django.core.mail import send_mail
from django.db import IntegrityError
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.parsers import MultiPartParser
from django.http import HttpResponse, Http404

from django.contrib.auth.models import Group

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

      #  team_cap_group = Group.objects.get(name="Team Captain")

        for attendee in Attendee.objects.filter(event=event):
            try:
                password = User.objects.make_random_password()
                new_user = User.objects.create_user(username=attendee.team_captain.name,
                                                    email=attendee.team_captain.email, password=password,)
               # new_user.user_permissions.add(Team)
                new_user = User.objects.create_user(username=attendee.team_captain.name.replace(" ", "."),
                                                    email=attendee.team_captain.email, password=password,)
                #team_cap_group.user_set.add(new_user)

                message = "Hello, " + attendee.team_captain.name + "\n Your password is:  " + \
                        password + ". \n \n \n Please login at [insert_url_here]"

                recipient = attendee.team_captain.email
                email = "baattendence@gmail.com"

                send_mail(subject=subject, message=message, recipient_list=[recipient],
                          from_email=email, fail_silently=True)

            except IntegrityError:
                pass

            return Response("all is quiet on the western front")

        return Response(status=200)
