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

print('Current Latitude is: ' + sys.argv[1])
print('Current Longitude is: ' + sys.argv[2])
print(location_tuples)
# Now calculate the euclidean distance between you