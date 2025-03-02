import googlemaps
import requests
from datetime import datetime

gmaps = googlemaps.Client(key='api key')

#Getting the current time
now = datetime.now()

#Grabs the user's location, returns None if it fails
def grab_user_location():
    try:
        response = requests.get("https://ipinfo.io/json")
        data = response.json()
        if "loc" in data:
            lat, lng = map(float, data["loc"].split(","))
            return f"{lat},{lng}" 
    except Exception as e:
        print("Error fetching location:", e)
    return None

#Gets the directions to a location, and returns the URL to the route
def get_directions_to_location(origin, destination):
    now = datetime.now()

    directions_result = gmaps.directions(origin, destination, departure_time=now)

    if directions_result:
        route_url = f"https://www.google.com/maps/dir/?api=1&origin={origin}&destination={destination}&travelmode=driving"
        return route_url
    else:
        return None

#Grabs user input for destination, and gets the route URL
destination = input("Enter your destination: ")

route_url = get_directions_to_location(grab_user_location(), destination)
if route_url:
    print(f"Opening route: {route_url}")
else:
    print("Could not fetch directions.")