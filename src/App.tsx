// App.jsx
import React from 'react';
import { useState, useEffect} from 'react';
import {APIProvider, Map, MapCameraChangedEvent} from '@vis.gl/react-google-maps';
import './App.css';
import polMap from './walkaboutMap.jpg'

function App() {
  const [blueMap, setblueMap] = useState(false);
  const toggleBlueMap = () => {
    setblueMap(!blueMap);
};
  return (
    
    <div className="App">
      <header className="App-header">
        Safety Portal
      </header>
      <div className="App-main-page">
      <APIProvider apiKey={'AIzaSyDBUndMi_YpuS5oLf6055INabmKhgqjmGo'} onLoad={() => console.log('Maps API has loaded.')}>
      <h1></h1>
      {!blueMap && <Map
        defaultZoom={13}
        defaultCenter={ { lat: -33.860664, lng: 151.208138 } }
        onCameraChanged={ (ev: MapCameraChangedEvent) =>
          console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
        }
        className = "Map">
      </Map>}
      {blueMap && <img src={polMap} width="800px" height="1200px"></img>} 
      </APIProvider>
      <button className="MapButton" onClick={toggleBlueMap}>Swap Map</button>
      <div className="parent-Text">
        <div>Know that there is always someone that you can call.</div>
        <div>For more information, visit:</div>
      </div>
      </div>
    </div>
  );
}

export default App;
