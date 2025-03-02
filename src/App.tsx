// App.jsx
import React, { useState, useEffect } from 'react';
import {APIProvider, Map, MapCameraChangedEvent, DirectionsRenderer} from '@vis.gl/react-google-maps';
import './App.css';

function App() {
  const [userLocation, setUserLocation] = useState(null);
  const [directions, setDirections] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          // After getting user location, fetch directions
          fetchDirections({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting user location:', error);
          // Handle errors (e.g., user denied location access)
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      // Handle cases where Geolocation is not supported
    }
  }, []);

  const fetchDirections = (origin) => {
    const destination = { lat: 37.7749, lng: -122.4194 }; // Example destination (San Francisco)
    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error(`Error fetching directions ${result}`);
        }
      }
    );
  };
  
  return (
    
    <div className="App">
      <header className="App-header">
        Path Pawtners
      </header>
      <APIProvider apiKey={'api_key_here'} onLoad={() => console.log('Maps API has loaded.')}>
      <h1>Guide Map</h1>
        <Map
          defaultZoom={7} // Adjusted zoom to see the route
          defaultCenter={userLocation || { lat: 0, lng: 0 }}
          className="Map"
        >
          {directions && <DirectionsRenderer directions={directions} />}
        </Map>
      </APIProvider>
      <p>Growlithe</p>
    </div>
  );
}

export default App;
