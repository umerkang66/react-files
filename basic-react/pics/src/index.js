import React from 'react';
import ReactDOM from 'react-dom';
// Importing the regenerator runtime at the main index file
import 'regenerator-runtime/runtime';
import 'core-js/stable';

import App from './components/App.js';

ReactDOM.render(<App />, document.getElementById('root'));
