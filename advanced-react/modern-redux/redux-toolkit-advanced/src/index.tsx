import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import Application from './components/application';

import { makeServer } from './api';

import ApplicationContext from './context';
import data from './api/data.json';
import './index.css';
import { store } from './store';
import { fetchTasks } from './features/tasks-slice';

const environment = process.env.NODE_ENV;
makeServer({ environment });

store.dispatch(fetchTasks());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApplicationContext.Provider value={data}>
        <Application />
      </ApplicationContext.Provider>
    </Provider>
  </React.StrictMode>
);
