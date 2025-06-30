import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Importar utilidades de debug en desarrollo
if (process.env.NODE_ENV === 'development') {
  import('./utils/debug.js');
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);