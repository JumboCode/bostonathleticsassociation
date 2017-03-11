from .models import Volunteer, Event, Attendee
from django.contrib.auth import get_user_model, authenticate
from django.conf import settings
from rest_framework import serializers, exceptions

class VolunteerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Volunteer
        fields = ('id', 'first_name', 'last_name', 'phone', 'email', 'city', 'state')
        read_only_fields = ('id',)
        depth = 1

class EventSerializer(serializers.ModelSerializer):

    class Meta:
        model = Event
        fields = ('id', 'name', 'date', 'csv')
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
        fields = ('id', 'volunteer', 'event', 'team_captain', 'status', 'notes', 'assignment_id',
            'general_event_id', 'specific_event_id', 'job_descrip')
        read_only_fields = ('id',)
        depth = 1

