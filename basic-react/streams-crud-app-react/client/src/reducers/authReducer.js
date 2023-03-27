import { SIGN_IN, SIGN_OUT } from '../actions/type.js';

const INITIAL_STATE = {
  isSignedIn: null,
  userId: null,
};

const authReducer = function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, isSignedIn: true, ...action.payload };
    case SIGN_OUT:
      return { ...state, isSignedIn: false, userId: null };
    default:
      return state;
  }
};

export default authReducer;
