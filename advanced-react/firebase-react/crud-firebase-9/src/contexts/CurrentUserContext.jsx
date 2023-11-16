import { createContext, useEffect, useReducer } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';

const CurrentUserContext = createContext({
  user: null,
  isAuthReady: false,
});

const types = { ADD_USER: 'ADD_USER', REMOVE_USER: 'REMOVE_USER' };

const currentUserReducer = (state, action) => {
  switch (action.type) {
    case types.ADD_USER:
      return { ...state, user: action.payload, isAuthReady: true };

    case types.REMOVE_USER:
      // this will run on signout
      return { ...state, user: null, isAuthReady: true };

    default:
      return state;
  }
};

const CurrentUserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(currentUserReducer, {
    user: null,
    isAuthReady: false,
  });

  const updateUser = user => {
    if (user) {
      return dispatch({ type: types.ADD_USER, payload: user });
    }
    dispatch({ type: types.REMOVE_USER });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, updateUser);

    return () => unsubscribe();
  }, []);

  return (
    <CurrentUserContext.Provider value={{ ...state }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export { CurrentUserContext, CurrentUserProvider };
