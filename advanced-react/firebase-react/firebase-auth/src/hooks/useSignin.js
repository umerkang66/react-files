import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { projectAuth } from '../firebase/config';

export function useSignin() {
  const [isCanceled, setIsCanceled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const signin = useCallback(
    async ({ email, password }) => {
      // displayName is from firebase auth
      setError(null);
      setIsPending(true);

      try {
        await projectAuth.signInWithEmailAndPassword(email, password);

        if (!isCanceled) {
          setIsPending(false);
          navigate('/');
        }
      } catch (err) {
        if (!isCanceled) {
          setError(err.message || 'Something went wrong');
          setIsPending(false);
        }
      }
    },
    [isCanceled]
  );

  useEffect(() => {
    setIsCanceled(false);
    return () => setIsCanceled(true);
  }, []);

  return { signin, isPending, error };
}
