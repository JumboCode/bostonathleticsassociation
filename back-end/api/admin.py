from django.contrib import admin
from api import models

class VolunteerAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'city', 'state',
                    'years_of_service', 'jacket', 'jacket_size',
                    'status', 'team_captain')

class EventAdmin(admin.ModelAdmin):
    list_display = ('name', 'date', 'duration', 'location', 'street', 'city', 'state', 'z_code', 'notes')

class AttendeeAdmin(admin.ModelAdmin):
    list_display = ('volunteer', 'event', 'at_event', 'team_captain', 'notes')

admin.site.register(models.Attendee, AttendeeAdmin)
admin.site.register(models.Volunteer, VolunteerAdmin)
admin.site.register(models.Event, EventAdmin)
