from django.contrib import admin
from api import models

class VolunteerAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'city', 'state',
                    'years_of_service', 'jacket', 'jacket_size',
                    'status', 'team_captain')

admin.site.register(models.Volunteer, VolunteerAdmin)