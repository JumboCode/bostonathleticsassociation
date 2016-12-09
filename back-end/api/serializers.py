from .models import Volunteer, Event, Attendee
from django.contrib.auth import get_user_model, authenticate
from django.conf import settings
from rest_framework import serializers, exceptions

class VolunteerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Volunteer
        fields = ('name', 'phone', 'email', 'city', 'state', 'years_of_service', 'jacket',
                  'jacket_size', 'status')
        read_only_fields = ('id',)
        depth = 1

class EventSerializer(serializers.ModelSerializer):

    class Meta:
        model = Event
        fields = ('name', 'date', 'csv')
        read_only_fields = ('id',)
        depth = 1

    def get_csv_url(self, obj):
        return self.context['request'].build_absolute_uri(self.csv)


class AttendeeSerializer(serializers.ModelSerializer):
    volunteer = VolunteerSerializer()
    event = EventSerializer()

    # override the nested volunteer, event fields to PrimareKeyRelatedField on writes
    def to_internal_value(self, data):
        self.fields['volunteer'] = serializers.PrimaryKeyRelatedField(queryset=Volunteer.objects.all())
        return super(AttendeeSerializer, self).to_internal_value(data)

    def to_internal_value(self, data):
        self.fields['event'] = serializers.PrimaryKeyRelatedField(queryset=Event.objects.all())
        return super(AttendeeSerializer, self).to_internal_value(data)

    class Meta:
        model = Attendee
        fields = ('volunteer', 'event', 'team_captain', 'at_event', 'notes')
        read_only_fields = ('id',)
        depth = 1

