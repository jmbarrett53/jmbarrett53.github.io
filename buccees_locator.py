import csv
import sys

location_tuples = []
with open('BuceesLocations.csv', mode='r') as file:
    csv_reader = csv.reader(file)
    next(csv_reader) # Skip over header row

    for row in csv_reader:
        lattitude = float(row[-2])
        longitude = float(row[-1])

        location_tuples.append((lattitude, longitude))

print(location_tuples, sys.argv[1])
# Now calculate the euclidean distance between you