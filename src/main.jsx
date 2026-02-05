// import * as serviceWorker from './serviceWorker.js';
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { HelmetProvider } from 'react-helmet-async';
import { store, persistor } from './app/store';
import App from './App';
import { WebSocketProvider } from './context/WebSocketContext';
import './index.css'
import 'sweetalert2/dist/sweetalert2.min.css'

if (import.meta.env.PROD) {
  console.log = () => {};
  console.info = () => {};
  console.debug = () => {};
  console.warn = () => {};
  // Keep console.error for critical errors but maybe filter it if needed
}

const root = ReactDOM.createRoot(document.getElementById('root'));
const apiUrl = 'https://playmoodserver-stg-0fb54b955e6b.herokuapp.com';
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <HelmetProvider>
        <WebSocketProvider url={apiUrl}>
          <App />
        </WebSocketProvider>
      </HelmetProvider>
    </PersistGate>
  </Provider>
);