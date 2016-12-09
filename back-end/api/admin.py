from django.contrib import admin
from api import models

class VolunteerAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'city', 'state',
                    'years_of_service', 'jacket', 'jacket_size',
                    'status')
    readonly_fields = ['id']


class EventAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'date', 'csv')
    readonly_fields = ['id']

class AttendeeAdmin(admin.ModelAdmin):
    list_display = ('id', 'get_volunteer', 'get_event', 'at_event', 'get_team_captain', 'notes')
    readonly_fields = ['id']

    def get_volunteer(self, obj):
        if obj.volunteer is not None:
            return obj.volunteer.name
        else:
            return "None"

    get_volunteer.short_description = "Volunteer"
    get_volunteer.admin_order_field = "attendee_volunteer"

    def get_event(self, obj):
        return obj.event.name

    get_event.short_description = "Event"
    get_event.admin_order_field = "attendee_event"

    def get_team_captain(self, obj):
        if obj.team_captain is not None:
            return obj.team_captain.name
        else:
            return "None"

    get_team_captain.short_description = "Team Captain"
    get_team_captain.admin_order_field = "attendee_team_captain"

admin.site.register(models.Volunteer, VolunteerAdmin)
admin.site.register(models.Event, EventAdmin)
admin.site.register(models.Attendee, AttendeeAdmin)
