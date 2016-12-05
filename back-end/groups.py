from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType
from api.models import Attendee

team_captain, created = Group.objects.get_or_create(name='Team Captain')
# Code to add permission to group ???
ct = ContentType.objects.get_for_model(Attendee)

# Now what - Say I want to add 'Can add project' permission to new_group?
permission = Permission.objects.get(codename='api.can_change_attendee')
team_captain.permissions.add(permission)