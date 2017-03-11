from django.contrib import admin
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from api import models

class VolunteerAdmin(admin.ModelAdmin):
    list_display = ('id','first_name', 'last_name', 'email', 'phone', 'city', 'state', 'user')
    readonly_fields = ['id']

class VolunteerInline(admin.StackedInline):
    model = models.Volunteer
    can_delete = False
    verbose_name_plural = 'Volunteer'

class EventAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'date', 'csv')
    readonly_fields = ['id']

class AttendeeAdmin(admin.ModelAdmin):
    list_display = ('id', 'get_volunteer', 'get_event', 'status', 'get_team_captain',
                    'notes', 'assignment_id', 'general_event_id', 'specific_event_id', 'job_descrip')
    readonly_fields = ['id']

    def get_volunteer(self, obj):
        if obj.volunteer is not None:
            return obj.volunteer.first_name + " " + obj.volunteer.last_name
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
            return obj.team_captain.first_name + " " + obj.team_captain.last_name
        else:
            return "None"

    get_team_captain.short_description = "Team Captain"
    get_team_captain.admin_order_field = "attendee_team_captain"

class UserAdmin(BaseUserAdmin):
    inlines = (VolunteerInline,)

admin.site.unregister(User)
admin.site.register(User, UserAdmin)
admin.site.register(models.Volunteer, VolunteerAdmin)
admin.site.register(models.Event, EventAdmin)
admin.site.register(models.Attendee, AttendeeAdmin)
