import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.jsx";
import "./index.css";
import { Provider } from 'zustand';
import useAuthStore from './authStore'; // 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider {...useAuthStore}>
      <App />
    </Provider>
  </React.StrictMode>
);
