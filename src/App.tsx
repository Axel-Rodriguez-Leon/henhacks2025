// App.jsx
import React from 'react';
import {APIProvider, Map, MapCameraChangedEvent} from '@vis.gl/react-google-maps';
import './App.css';

function App() {
  return (
    
    <div className="App">
      <header className="App-header">
        Axel, Haiya, Jonah, Shaina HenHacks Team Project
      </header>
      <APIProvider apiKey={'API Key Here'} onLoad={() => console.log('Maps API has loaded.')}>
      <h1>Hello, world!</h1>
      <Map
        defaultZoom={13}
        defaultCenter={ { lat: -33.860664, lng: 151.208138 } }
        onCameraChanged={ (ev: MapCameraChangedEvent) =>
          console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
        }
        className = "Map">
      </Map>
      </APIProvider>
      <p>Growlithe</p>
    </div>
  );
}

export default App;
