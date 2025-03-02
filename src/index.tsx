// index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client'
import App from './App.tsx';
import './App.css';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root')); // Use createRoot.

root.render(
    <App />
);
