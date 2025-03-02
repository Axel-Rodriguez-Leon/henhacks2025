import React, { useState, useEffect, useRef } from 'react';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import './App.css';

function App() {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [destination, setDestination] = useState<string>(''); // State for user input destination
  const [directionsText, setDirectionsText] = useState<string | null>(null); // State to hold directions text
  const mapRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLoc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(userLoc);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const fetchDirections = (origin: { lat: number; lng: number }, destination: string) => {
    const directionsService = new google.maps.DirectionsService();

    // Geocode the destination to get lat/lng
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: destination }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK && results.length > 0) {
        const destinationLatLng = results[0].geometry.location;

        directionsService.route(
          {
            origin: origin,
            destination: destinationLatLng,
            travelMode: google.maps.TravelMode.WALKING,
          },
          (result, status) => {
            if (status === google.maps.DirectionsStatus.OK && result.routes.length > 0) {
              // Get the steps from the directions result
              const steps = result.routes[0].legs[0].steps;
              const directions = steps
                .map((step, index) => `${index + 1}. ${step.instructions}`)
                .join('\n'); // Combine all steps into a text string

              setDirectionsText(directions); // Set the directions text in the state
            } else {
              console.error("Error fetching directions", result);
            }
          }
        );
      } else {
        console.error("Geocode failed: " + status);
      }
    });
  };

  const handleDestinationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDestination(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userLocation && destination) {
      fetchDirections(userLocation, destination);
    } else {
      console.error("Please enter a valid destination and ensure location is available.");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        USafe
      </header>
      <APIProvider apiKey={'AIzaSyDBUndMi_YpuS5oLf6O55INabmKhgqjmGo'} onLoad={() => console.log('Maps API has loaded.')}>
        <h1>Guide Map</h1>
        <Map
          defaultZoom={7}
          defaultCenter={userLocation || { lat: 0, lng: 0 }}
          className="Map"
          onLoad={(map) => (mapRef.current = map)}
        />
        
        {/* User input for destination */}
        <form onSubmit={handleSubmit}>
          <label>
            Enter destination:
            <input
              type="text"
              value={destination}
              onChange={handleDestinationChange}
              placeholder="Enter a location"
            />
          </label>
          <button type="submit">Get Directions</button>
        </form>

        {/* Display the directions text if available */}
        {directionsText && (
          <div className="directions">
            <h3>Directions:</h3>
            <pre>{directionsText}</pre> {/* Display directions as text */}
          </div>
        )}
      </APIProvider>
    </div>
  );
}

export default App;
