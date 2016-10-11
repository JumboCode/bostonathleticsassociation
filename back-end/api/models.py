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
    team_captain = models.CharField(max_length=30)
