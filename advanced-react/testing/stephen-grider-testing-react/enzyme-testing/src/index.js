import React from 'react';
import ReactDOM from 'react-dom';

import App from 'components/App';
// Root component is responsible for managing all the redux stuff
import Root from 'Root';

ReactDOM.render(
  <Root>
    <App />
  </Root>,
  document.getElementById('root')
);
