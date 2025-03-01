// index.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';  // Import the App component
import './index.css';     // If you have any global styles

ReactDOM.render(
  <React.StrictMode>
    <App />  {/* Render the App component */}
  </React.StrictMode>,
  document.getElementById('root')  // Ensure there's a div with id 'root' in index.html
);