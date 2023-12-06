//updated index.js
import React from 'react';
import ReactDOM from 'react-dom';//react import.
import App from './App'; //importing app.js from src folder.
import './index.css';//css styling.
import { BrowserRouter as Router } from 'react-router-dom';//router dom import.

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
