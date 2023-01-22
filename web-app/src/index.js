import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import React from 'react';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
<React.StrictMode>
  <Router>
    <App/>
  </Router>
</React.StrictMode>)