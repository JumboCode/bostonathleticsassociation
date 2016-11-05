from rest_framework import serializers
from .models import Volunteer, Event

class VolunteerSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Volunteer
        fields = ('name', 'phone', 'email', 'city', 'state', 'years_of_service', 'jacket',
                  'jacket_size', 'status', 'team_captain')



class EventSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Event
        fields = ('name', 'date', 'duration', 'location', 'street', 'city','state', 'z_code', 'notes')

