// App.jsx
import React from 'react';
import {APIProvider, Map, MapCameraChangedEvent} from '@vis.gl/react-google-maps';
import './App.css';

function App() {
  return (
    
    <div className="App">
      <header className="App-header">
        Get home safe!
      </header>
      <div className="App-main-page">
      <APIProvider apiKey={'AIzaSyDBUndMi_YpuS5oLf6055INabmKhgqjmGo'} onLoad={() => console.log('Maps API has loaded.')}>
      <h1></h1>
      <Map
        defaultZoom={13}
        defaultCenter={ { lat: -33.860664, lng: 151.208138 } }
        onCameraChanged={ (ev: MapCameraChangedEvent) =>
          console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
        }
        className = "Map">
      </Map>
      </APIProvider>
      </div>
    </div>
  );
}

export default App;
