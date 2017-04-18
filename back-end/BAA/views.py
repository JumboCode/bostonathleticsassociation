from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from django.core import serializers
from django.db.models import Q

from api.models import *
from api.serializers import *

import datetime


class CustomObtainAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        response = super(CustomObtainAuthToken, self).post(request, *args, **kwargs)
        token = Token.objects.get(key=response.data['token'])
        first_name = token.user.profile.volunteer.first_name
        # return the team captain that just logged in successfully
        # filter by user credentials that just signed in
        email = token.user.get_username()

        # get volunteer id tied to user account
        team_cap_id = token.user.profile.volunteer.id
        print("team_cap_id")

        # since volunteers are all unique now, we can just filter by that id
        volunteers = Attendee.objects.filter(team_captain=team_cap_id)

        serializer = AttendeeSerializer(volunteers, many=True)

        # return the attendees for the teamp captain along with token information
        return Response({'token': token.key, 'first_name':first_name,
                         'volunteers':serializer.data})


def guide(request):
    render(request, './templates/login-instructions.html')