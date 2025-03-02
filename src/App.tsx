// App.jsx
import React from 'react';
import { useRef } from 'react';
import { useState, useEffect} from 'react';
import {APIProvider, Map, MapCameraChangedEvent, useMapsLibrary,
  useMap, Marker} from '@vis.gl/react-google-maps';
import './App.css';
import polMap from './walkaboutMap.jpg'


function App() {
  const [blueMap, setblueMap] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [directions, setDirections] = useState(null);
  const toggleBlueMap = () => {
    setblueMap(!blueMap);
};
var marker1 = useRef(null);
var marker2 = useRef(null);
var Pos1 = {
  lat: 0,
  lng: 0
}
var Pos2 = {lat: 0, lng: 0};
  const map = useMap();
  const routesLibrary = useMapsLibrary('routes');
  const [directionsService, setDirectionsService] =
    useState();
    
  const [directionsRenderer, setDirectionsRenderer] =
    useState();
  const [routes, setRoutes] = useState([]);
  const [routeIndex, setRouteIndex] = useState(0);
  const selected = routes[routeIndex];
  const leg = selected?.legs[0];


useEffect(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        // After getting user location, fetch directions
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
  const destination = {lat: 39.676, lng: -75.747};
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
        USafe Safety Portal
      </header>
      <div className="App-main-page">
      <APIProvider apiKey={'insert key here'} onLoad={() => console.log('Maps API has loaded.')}>
      <h1></h1>
      {!blueMap && 
        <Map
          defaultZoom={13} // Adjusted zoom to see the route
          defaultCenter={userLocation || { lat: 0, lng: 0 }}
          className="Map"
        >
          <Marker ref = {marker2} position = {{lat: 39.676, lng: -75.747}} draggable = {true}> </Marker>
          <Marker ref = {marker1} position = {userLocation || { lat: 0, lng: 0 }} draggable = {true}> </Marker>

          
          {directions && <directionsRenderer directions={directions} />}
        </Map>}
      {blueMap && <img src={polMap} width="800px" height="1200px"></img>} 
      </APIProvider>
      <button className="MapButton" onClick={toggleBlueMap}>Swap Map</button>
      
        <div className = "child1">Know that there is always someone that you can call. The blue light stations around
          campus (accesible by clicking the above button) will connect you with the police quickly!
        </div>
        <div className = "child2"><div>For more information, visit:</div><a href = "https://www1.udel.edu/police/">{ "https://www1.udel.edu/police/" }</a></div>
      
      </div>
    </div>
  );
}

export default App;
