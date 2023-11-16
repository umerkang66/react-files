import 'bulma/css/bulma.css';
import './styles.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './app';
import store from './store';

const el = document.getElementById('root');
const root = ReactDOM.createRoot(el!);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
