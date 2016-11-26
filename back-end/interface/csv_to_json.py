import csv, json, sys, os 

#gets filepath
filepath = os.getcwd()

#assuming current directory structure, adds json data to fixtures
filepath = filepath[0:(len(filepath) - 9)] + 'api/fixtures/' + sys.argv[2]

csvfile = open(sys.argv[1], 'r')
jsonfile = open(filepath, 'w')

fieldnames = ("name", "status", "city", "state", "phone", "email", "years_of_service", "jacket", "jacket_size", "team_captain")
reader = csv.DictReader(csvfile, fieldnames)

jsonfile.write('[\n')
count = 0

for row in reader:
    if count != 0:
        if count != 1:
            jsonfile.write(',\n')
        jsonfile.write('{\n \"model\": \"api.volunteer\",\n')
        #TODO this is a hack, we need to hardcode largest pk
        jsonfile.write('\"pk\": ' + str(count + 3) + ',\n')
        jsonfile.write('\"fields\": \n')
        json.dump(row, jsonfile)
        jsonfile.write('\n')
        jsonfile.write('}')
    count += 1
jsonfile.write('\n]')

jsonfile.close()

#removes unnecessary team_captain data but also all formatting
with open(filepath, 'r') as data_file:
    data = json.load(data_file)

for element in data:
    del element["fields"]["team_captain"]

with open(filepath, 'w') as data_file:
    data = json.dump(data, data_file)
