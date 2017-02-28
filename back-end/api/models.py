from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


class Volunteer(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.CharField(max_length=50)
    phone = models.CharField(max_length=20)
    city = models.CharField(max_length=30)
    state = models.CharField(max_length=30)
    years_of_service = models.CharField(max_length=3)
    jacket = models.CharField(max_length=30)
    jacket_size = models.CharField(max_length=30)
    status = models.CharField(max_length=30)
    active = models.CharField(max_length=30)

    def __str__(self):
       return self.name

class Event(models.Model):
    name = models.CharField(max_length=30)
    date = models.CharField(max_length=30)
    csv = models.FileField(null=True, upload_to='file')

    def __str__(self):
        return self.name

class Attendee(models.Model):
    volunteer = models.ForeignKey(Volunteer, related_name="volunteer")
    event = models.ForeignKey(Event, related_name="event", related_query_name="event")
    at_event = models.IntegerField(default=0)
    notes = models.TextField(blank=True, null=True)
    team_captain = models.ForeignKey(Volunteer, related_name="team_captain", null=True)
    team_cap_name = models.CharField(max_length=50, null=True)
    assignment_id = models.IntegerField()
    general_event_id = models.IntegerField()
    specific_event_id = models.IntegerField()
    job_descrip = models.CharField(max_length=50)


    def __str__(self):
        return self.volunteer.name

