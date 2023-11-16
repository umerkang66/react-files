import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer.js';
import streamReducer from './streamsReducer.js';

// prettier-ignore
export default combineReducers({
  auth: authReducer,
  form: formReducer,
  streams: streamReducer,
});
