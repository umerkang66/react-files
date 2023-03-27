import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import reducers from 'reducers';
import async from 'middlewares/async';
import stateValidator from 'middlewares/stateValidator';

// Second argument empty state
const Root = ({ children, initialState = {} }) => {
  const middlewares = [async, stateValidator];

  const store = createStore(
    reducers,
    initialState,
    applyMiddleware(...middlewares)
  );

  return <Provider store={store}>{children}</Provider>;
};

export default Root;
