import csv, json, sys

csvfile = open(sys.argv[1], 'r')
jsonfile = open(sys.argv[2], 'w')

fieldnames = ("name", "status", "city", "state", "phone", "email", "years_of_service", "jacket", "jacket_size", "team_captain")
reader = csv.DictReader(csvfile, fieldnames)

jsonfile.write('[\n')
count = 0
for row in reader:
    if count != 0:
        json.dump(row, jsonfile)
        jsonfile.write(',')
        jsonfile.write('\n')
    count += 1
jsonfile.write(']')