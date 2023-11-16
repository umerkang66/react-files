import { createContext, useReducer } from 'react';

const types = {
  ADD_USER: 'ADD_USER',
  SIGNOUT: 'SIGNOUT',
  LOADING: 'LOADING',
};

const AuthContext = createContext({
  user: null,
  login: user => {},
  signout: () => {},
  authIsReady: false,
});

const authReducer = (state, action) => {
  switch (action.type) {
    case types.ADD_USER:
      return { ...state, user: action.payload, authIsReady: true };
    case types.SIGNOUT:
      return { ...state, user: null, authIsReady: true };
    default:
      return state;
  }
};

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
  });

  const login = user => {
    dispatch({ type: types.ADD_USER, payload: user });
  };

  const signout = () => {
    dispatch({ type: types.SIGNOUT });
  };

  return (
    <AuthContext.Provider
      value={{ ...state, login, signout, authIsReady: state.authIsReady }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
