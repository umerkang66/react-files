import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function useCurrentUserContext() {
  return useContext(CurrentUserContext);
}

export { useCurrentUserContext };
