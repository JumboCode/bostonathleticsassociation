import csv, json

csvfile = open('sample.csv', 'r')
jsonfile = open('sampleout.json', 'w')

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