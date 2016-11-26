from rest_framework import serializers
from .models import Volunteer, Event, Attendee

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

        depth = 1
