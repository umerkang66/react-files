import axios from 'axios';
import { AUTH_USER, AUTH_ERROR } from './types';

// This action access to the "dispatch" function because redux-thunk middleware that is wired up in the index.js file
// Dispatch function: is like a funnel that passes action (that contains "type", and "payload") through redux-middlewares, reducers, and then eventually to the store (state), with the help of it, we can send as many actions as we like to the redux process (that is actions, to middlewares, to reducers, and to store(state)), we we will call dispatch with the "action object" (that is type, and payload) the "action object" is going to pass through the redux process, hence again through the redux-thunk.
// Redux-thunk: It is a middleware that sees if action that is passed through it returns "function" or "object (with type and payload property)", if it is a function thunk is going to call the function and pass the "dispatch function" and "getState function" (thunk is a middleware, and all the redux-middlewares get these two function from redux)

export const signup = (authProps, navigationCallback) => async dispatch => {
  const { email, password } = authProps;
  const apiUrl = 'http://localhost:3090';

  try {
    const { data } = await axios.post(`${apiUrl}/signup`, { email, password });

    // Calling the dispatch, and we don't need to return it from this page
    dispatch({ type: AUTH_USER, payload: data.token });

    // Persisting the token in local storage
    localStorage.setItem('token', data.token);
    // We can get this token from store initial state in the root index.js file

    // Calling the navigation callback, and navigating the user to the homepage
    navigationCallback();
  } catch (err) {
    dispatch({ type: AUTH_ERROR, payload: 'Email in use' });
  }
};

export const signin = (authProps, navigationCallback) => async dispatch => {
  const { email, password } = authProps;
  const apiUrl = 'http://localhost:3090';

  try {
    const { data } = await axios.post(`${apiUrl}/signin`, { email, password });

    // Calling the dispatch, and we don't need to return it from this page
    dispatch({ type: AUTH_USER, payload: data.token });

    // Persisting the token in local storage
    localStorage.setItem('token', data.token);
    // We can get this token from store initial state in the root index.js file

    // Calling the navigation callback, and navigating the user to the homepage
    navigationCallback();
  } catch (err) {
    dispatch({ type: AUTH_ERROR, payload: 'Invalid login credientials' });
  }
};

export const signout = () => {
  localStorage.removeItem('token');

  return {
    type: AUTH_USER,
    // What we send here as payload will be assigned to the authenticated property of auth, so we send empty string
    payload: '',
  };
};
