import json, sys
from django.db import models
from api.models import *

def parse_json(json_file, event):
    for obj in json_file:
        volunteer = add_volunteer(obj["fields"])
        attendee = add_attendee(volunteer, event, obj["fields"]["team_captain"])


def add_volunteer(json_object):
    volunteer = Volunteer.objects.create(
        name=json_object["name"],
        phone=json_object["phone"],
        email=json_object["email"],
        city=json_object["city"],
        state=json_object["state"],
        years_of_service=json_object["years_of_service"],
        jacket=json_object["jacket"],
        jacket_size=json_object["jacket_size"],
        status=json_object["status"])
    return volunteer

def add_attendee(volunteer_data, event_data, captain):
    attendee = Attendee.objects.create(
        volunteer = volunteer_data,
        event = event_data,
        at_event = False,
        notes = ""
        team_captain = captain)
    return attendee