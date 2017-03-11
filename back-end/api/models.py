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
    first_name = models.CharField(max_length=30, default=None, null=True)
    last_name = models.CharField(max_length=30, default=None, null=True)
    email = models.CharField(max_length=50, default=None, null=True)
    phone = models.CharField(max_length=20, default=None, null=True)
    city = models.CharField(max_length=30, default=None, null=True)
    state = models.CharField(max_length=30, default=None, null=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, default=None, null=True)

    # def __str__(self):
       # first_name = self.volunteer.first_name + " " + self.volunteer.last_name
       #return first_name

class Event(models.Model):
    name = models.CharField(max_length=30)
    date = models.DateField()
    csv = models.FileField(null=True, upload_to='file')

    def __str__(self):
        return self.name

class Attendee(models.Model):
    volunteer = models.ForeignKey(Volunteer, related_name="volunteer")
    event = models.ForeignKey(Event, related_name="event", related_query_name="event")
    status = models.IntegerField(default=0)
    notes = models.TextField(blank=True, null=True)
    team_captain = models.ForeignKey(Volunteer, related_name="team_captain", null=True)
    assignment_id = models.IntegerField(null=True, default=None)
    job_descrip = models.CharField(max_length=50, null=True, default=None)


    #def __str__(self):
     #   name = self.volunteer.first_name + " " + self.volunteer.last_name
     #   return name

