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
import BASE_API_URL from './apiConfig';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <HelmetProvider>
        <WebSocketProvider url={BASE_API_URL}>
          <App />
        </WebSocketProvider>
      </HelmetProvider>
    </PersistGate>
  </Provider>
);