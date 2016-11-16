from django.contrib import admin
from api import models

class VolunteerAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'city', 'state',
                    'years_of_service', 'jacket', 'jacket_size',
                    'status')


class EventAdmin(admin.ModelAdmin):
    list_display = ('name', 'date')

class AttendeeAdmin(admin.ModelAdmin):
    list_display = ('get_volunteer', 'get_event', 'at_event', 'get_team_captain', 'notes')

    def get_volunteer(self, obj):
        return obj.volunteer.name

    get_volunteer.short_description = "Volunteer"
    get_volunteer.admin_order_field = "attendee_volunteer"

    def get_event(self, obj):
        return obj.event.name

    get_event.short_description = "Event"
    get_event.admin_order_field = "attendee_event"

    def get_team_captain(self, obj):
        return obj.team_captain.name

    get_team_captain.short_description = "Team Captain"
    get_team_captain.admin_order_field = "attendee_team_captain"

admin.site.register(models.Attendee, AttendeeAdmin)
admin.site.register(models.Volunteer, VolunteerAdmin)
admin.site.register(models.Event, EventAdmin)
