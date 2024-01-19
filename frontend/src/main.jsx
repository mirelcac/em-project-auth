//import React from "react";
//import ReactDOM from "react-dom/client";
//import { App } from "./App.jsx";
//import "./index.css";
//import { Provider } from 'zustand';
//import { useAuthStore } from './components/authStore';

//ReactDOM.createRoot(document.getElementById('root')).render(
//  <React.StrictMode>
//    <Provider {...useAuthStore}>
//      <App />
//    </Provider>
//  </React.StrictMode>
//);

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from 'react-router-dom';
import { App } from "./App.jsx";
import "./index.css";

// No need to import Provider from 'zustand'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);

