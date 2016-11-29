from .models import Volunteer, Event, Attendee
from django.contrib.auth import get_user_model, authenticate
from django.conf import settings
from rest_framework import serializers, exceptions

class VolunteerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Volunteer
        fields = ('name', 'phone', 'email', 'city', 'state', 'years_of_service', 'jacket',
                  'jacket_size', 'status')

        depth = 1

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('name', 'date')
        depth = 1

class AttendeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendee
        fields = ('volunteer', 'event', 'team_captain', 'at_event', 'notes')
