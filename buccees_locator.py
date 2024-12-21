import csv
import sys
import math

location_tuples = []
with open('BuceesLocations.csv', mode='r') as file:
    csv_reader = csv.reader(file)
    next(csv_reader) # Skip over header row

    for row in csv_reader:
        lattitude = float(row[-2])
        longitude = float(row[-1])

        location_tuples.append((lattitude, longitude))

def get_dist_to_nearest_buccees(lat_in, long_in):
    """
    Given the current location, return the smallest euclidean distance to a buccees
    """
    min_dist = float('inf')
    for buccees_loc in location_tuples:
        buc_lattitude = buccees_loc[0]
        buc_longitude = buccees_loc[1]

        # Get differences
        delta_lat = lat_in - buc_lattitude
        delta_long = long_in - buc_longitude

        # Convert differences to miles
        x = 69 * delta_lat
        y = 69 * math.cos(math.radians((lat_in + buc_lattitude) / 2)) * delta_long
        # Euclidean distance in miles
        dist = math.sqrt(x**2 + y**2)
        if dist < min_dist:
            min_dist = dist
    return min_dist

print('Current Latitude is: ' + sys.argv[1])
print('Current Longitude is: ' + sys.argv[2])
print('You are ' + get_dist_to_nearest_buccees(sys.argv[1], sys.argv[2]) + ' miles away from the nearest Buc-ees')