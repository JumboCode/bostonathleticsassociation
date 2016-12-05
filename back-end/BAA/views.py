from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from django.core import serializers

from api.models import *
from api.serializers import *

import datetime


class CustomObtainAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        response = super(CustomObtainAuthToken, self).post(request, *args, **kwargs)
        token = Token.objects.get(key=response.data['token'])
        first_name = token.user.get_short_name()

        team_cap = Volunteer.objects.filter(name=first_name)

        qs = Attendee.objects.filter(team_captain=team_cap)

        serializer = AttendeeSerializer(qs, many=True)

        #time = datetime.datetime.now()

        #TODO still need to filter by event date

        return Response({'token': token.key, 'first_name': first_name, 'volunteers':serializer.data})
        # TODO: temporary fix things hopefully
        #return Response({'token': token.key, 'first_name': first_name})