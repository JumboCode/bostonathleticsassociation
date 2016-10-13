from rest_framework import serializers
from .models import Volunteer

class VolunteerSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Volunteer
        fields = ('name', 'phone', 'email', 'city', 'state', 'years_of_service', 'jacket',
                  'jacket_size', 'status', 'team_captain')

