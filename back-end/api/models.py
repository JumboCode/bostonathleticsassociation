from django.db import models

class Volunteer(models.Model):
    name = models.CharField(max_length=30)
    email = models.CharField(max_length=50)
    phone = models.CharField(max_length=20)
    city = models.CharField(max_length=30)
    state = models.CharField(max_length=30)
    years_of_service = models.CharField(max_length=3)
    jacket = models.CharField(max_length=30)
    jacket_size = models.CharField(max_length=30)
    status = models.CharField(max_length=30)

class Event(models.Model):
    name = models.CharField(max_length=30)
    date = models.CharField(max_length=30)

class Attendee(models.Model):
    volunteer = models.OneToOneField(Volunteer, related_name="volunteer")
    event = models.ForeignKey(Event)
    at_event = models.BooleanField(default=False)
    notes = models.TextField(null=True)
    team_captain = models.OneToOneField(Volunteer, related_name="team_captain", null=True)