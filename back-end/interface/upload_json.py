import json, sys
from django.db import models
from api.models import *
# from . import api
# from api.models import *

def parse_json(json_file):
    for obj in json_file:
        add_volunteer(obj["fields"])

def add_volunteer(json_object):
    Volunteer.objects.create(
        name=json_object["name"],
        phone=json_object["phone"],
        email=json_object["email"],
        city=json_object["city"],
        state=json_object["state"],
        years_of_service=json_object["years_of_service"],
        jacket=json_object["jacket"],
        jacket_size=json_object["jacket_size"],
        status=json_object["status"])

# with open(sys.argv[1], 'r') as file_path:
#     data = json.load(file_path)

# parse_json(data)