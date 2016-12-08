import csv, json, sys, os
from io import StringIO
from django.db import models
from .models import *

def parse_csv(csv_file):


    #csvfile = open(csv_file, 'r')

    #json_file = csv_file.name[0:((len(csv_file) -4))] + ".json"
    #jsonfile = open(json_file, 'w')

    #data = csv_file.read()

    #fieldnames = ("name", "status", "city", "state", "phone", "email", "years_of_service", "jacket", "jacket_size", "team_captain")
    csvf = StringIO(csv_file.read().decode('ascii'))

    csvf.seek(0)

    reader = csv.DictReader(csvf, delimiter=',')

    print(reader)

    for row in reader:
        print("here")
        volunter = Volunteer.objects.get_or_create(
            name=row[0],
            staus=row[1],
            city= row[2],
            state=row[3],
            phone=row[4],
            email=row[5],
            years_of_service=row[6],
            jacket=row[7],
            jacket_size=row[8]
        )

    return
