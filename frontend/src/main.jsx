import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './redux/store.js'
import { Provider } from 'react-redux'
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css'

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={clientId} >
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
      </PersistGate>
    </Provider>
  </GoogleOAuthProvider>
)
