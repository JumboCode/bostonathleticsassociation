import csv, json, sys, os
from io import StringIO
from django.db import models
from .models import *
from io import TextIOWrapper

def parse_csv(csvf, event, encoding):

    f = TextIOWrapper(csvf.file, encoding=encoding)
    reader = csv.reader(f, delimiter=',')

    for row in reader:
        print ("here")
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

