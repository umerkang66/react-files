import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import { NavigationProvider } from './contexts/navigation';

const el = document.getElementById('root');
const root = ReactDOM.createRoot(el);

root.render(
  <React.StrictMode>
    <NavigationProvider>
      <App />
    </NavigationProvider>
  </React.StrictMode>
);
