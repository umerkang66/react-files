import { useCallback, useEffect, useState } from 'react';
import { projectAuth } from '../firebase/config';

export function useSignout() {
  const [isCanceled, setIsCanceled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const signout = useCallback(async () => {
    // displayName is from firebase auth
    setError(null);
    setIsPending(true);
    try {
      await projectAuth.signOut();
      if (!isCanceled) {
        setIsPending(false);
      }
    } catch (err) {
      if (!isCanceled) {
        setError(err.message || 'Something went wrong');
        setIsPending(false);
      }
    }
  }, [isCanceled]);

  useEffect(() => {
    setIsCanceled(false);
    return () => setIsCanceled(true);
  }, []);

  return { signout, isPending, error };
}
