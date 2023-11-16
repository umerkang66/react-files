import { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { projectAuth } from '../firebase/config';

export function useSignup() {
  const [isCanceled, setIsCanceled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const signup = useCallback(
    async ({ email, password, displayName }) => {
      // displayName is from firebase auth
      setError(null);
      setIsPending(true);

      try {
        const res = await projectAuth.createUserWithEmailAndPassword(
          email,
          password
        );
        await res.user.updateProfile({ displayName });

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

  return { signup, isPending, error };
}
