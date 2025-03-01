import googlemaps
from datetime import datetime

gmaps = googlemaps.Client(key='insert_api_key_here')

now = datetime.now()

address = "Smith Hall, 18 Amstel Ave, Newark, DE 19716"
geocode_result = gmaps.geocode(address)

print(f"Geocode result for {address}:")
print(geocode_result)

origin = "New York, NY"
destination = "Delaware, DE"
directions_result = gmaps.directions(origin, destination, departure_time=now)

if directions_result:
    print("\nFirst step of the route:")
    print(directions_result[0]['legs'][0]['steps'][0]['html_instructions'])
