from rest_framework import serializers
from .models import Volunteer, Event, Attendee

class VolunteerSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Volunteer
        fields = ('name', 'phone', 'email', 'city', 'state', 'years_of_service', 'jacket',
                  'jacket_size', 'status')

class EventSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Event
        fields = ('name', 'date')

class AttendeeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Attendee
        fields = ('volunteer', 'event', 'team_captain', 'at_event', 'notes')

