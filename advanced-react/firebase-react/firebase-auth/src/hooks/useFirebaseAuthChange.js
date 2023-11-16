import { useEffect } from 'react';

import { projectAuth } from '../firebase/config';
import { useAuthContext } from '../hooks/useAuthContext';

const useFirebaseAuthChange = () => {
  const auth = useAuthContext();

  useEffect(() => {
    // This will return the currentUser, that is stored in the authContext
    const unSub = projectAuth.onAuthStateChanged(user => {
      if (user) auth.login(user);
      else auth.signout();
    });

    return () => unSub();
  }, []);
};

export { useFirebaseAuthChange };
