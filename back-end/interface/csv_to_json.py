import csv, json, sys

csvfile = open(sys.argv[1], 'r')
jsonfile = open(sys.argv[2], 'w')

fieldnames = ("Vol Name","Status","City","State","Phone","Email","Service Years","Jacket","JacketSize","GroupName")
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