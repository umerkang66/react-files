import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useMutation } from './useMutation';

const signupFn = ({ email, password }) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

function useSignup() {
  const { mutate, loading, error } = useMutation(signupFn);

  return { signup: mutate, loading, error };
}

export { useSignup };
