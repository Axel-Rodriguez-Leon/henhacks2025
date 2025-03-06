import React, { useState, useEffect, useRef } from 'react';
import { APIProvider, Map, Marker, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import './App.css';
import polMap from './walkaboutMap.jpg';

function App() {
  const [blueMap, setBlueMap] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [destination, setDestination] = useState('');
  const [directions, setDirections] = useState(null);
  const [directionsText, setDirectionsText] = useState('');

  const marker1 = useRef(null); // User location marker
  const marker2 = useRef(null); // Destination marker

  const map = useMap();
  const routesLibrary = useMapsLibrary('routes');

  // Get the user's current location using geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  // Function to handle destination input change
  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
  };

  // Function to fetch directions based on current location and destination
  const fetchDirections = (origin, destination) => {
    const geocoder = new window.google.maps.Geocoder();
    const directionsService = new window.google.maps.DirectionsService();

    // Geocode the destination
    geocoder.geocode({ address: destination }, (results, status) => {
      if (status === window.google.maps.GeocoderStatus.OK && results.length > 0) {
        const destinationLatLng = results[0].geometry.location;

        // Request directions from user's location to the destination
        directionsService.route(
          {
            origin: origin,
            destination: destinationLatLng,
            travelMode: window.google.maps.TravelMode.WALKING,
          },
          (result, status) => {
            if (status === window.google.maps.DirectionsStatus.OK) {
              setDirections(result); // Store directions in state

              // Extracting directions steps as text
              const stepsText = result.routes[0].legs[0].steps
                .map((step, index) => `${index + 1}. ${step.instructions}`)
                .join('\n');
              setDirectionsText(stepsText); // Store the text version of directions
            } else {
              console.error('Error fetching directions:', result);
            }
          }
        );
      } else {
        console.error('Geocode failed:', status);
      }
    });
  };

  // Function to handle form submission for directions
  const handleSubmit = (e) => {
    e.preventDefault();
    if (userLocation && destination) {
      fetchDirections(userLocation, destination);
    } else {
      console.error('Please provide a valid destination and ensure location is available.');
    }
  };

  // Toggle map view between the standard Google Map and a static image map
  const toggleBlueMap = () => {
    setBlueMap(!blueMap);
  };

  return (
    <div className="App">
      <header className="App-header">
        USafe Safety Portal
      </header>
      <div className="App-main-page">
        <APIProvider apiKey="API Key Here" onLoad={() => console.log('Maps API has loaded.')}>
          <h1>Guide Map</h1>
          {!blueMap && (
            <Map defaultZoom={13} defaultCenter={userLocation || { lat: 0, lng: 0 }} className="Map">
              {userLocation && <Marker ref={marker1} position={userLocation} draggable={true} />}
              {directions && (
                <Marker ref={marker2} position={directions.routes[0].legs[0].end_location} draggable={true} />
              )}
            </Map>
          )}
          {blueMap && <img src={polMap} width="800px" height="1200px" />}
        </APIProvider>

        {/* Input for destination */}
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

        {/* Directions as text */}
        {directionsText && (
          <div className="directions">
            <h3>Directions:</h3>
            <pre>{directionsText}</pre> {/* Display directions as text */}
          </div>
        )}

        <button className="MapButton" onClick={toggleBlueMap}>
          Swap Map
        </button>

        <div className="child1">
          Know that there is always someone that you can call. The blue light stations around campus (accessible by clicking the above button) will connect you with the police quickly!
        </div>
        <div className="child2">
          <div>For more information, visit:</div>
          <a href="https://www1.udel.edu/police/">{'https://www1.udel.edu/police/'}</a>
        </div>
      </div>
    </div>
  );
}

export default App;
