import React from 'react';
import ReactDOM from 'react-dom/client'; // updating import as i've upgraded to react 18
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// creating a root
const root = ReactDOM.createRoot(document.getElementById('root'));

// render using .createroot
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
