from .models import *
from django.db import IntegrityError
from .serializers import VolunteerSerializer, EventSerializer, AttendeeSerializer
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.mail import send_mail


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


class NotifyTeamCaptains(APIView):

    def get(self, request, event):
        event = self.kwargs['event']

        subject = "You have been registered as a Team Captain for: " + Event.objects.get(pk= event).name

        for attende in Attendee.objects.filter(event=event):
            try:
                password = User.objects.make_random_password()
                new_user = User.objects.create_user(username=attende.team_captain.name,
                                                    email=attende.team_captain.email, password=password)

                message = "Hello, " + attende.team_captain.name + "\n Your password is:  " + \
                        password + ". \n \n \n Please login at [insert_url_here]"

                recipient = attende.team_captain.email
                email = "baattendence@gmail.com"

                send_mail(subject=subject, message=message, recipient_list=[recipient],
                          from_email=email, fail_silently=True)

            except IntegrityError:
                pass

            return Response("all is quiet on the western front")


