import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useMutation } from './useMutation';

const signinFn = ({ email, password }) => {
  return signInWithEmailAndPassword(auth, email, password);
};

function useSignin() {
  const { mutate, loading, error } = useMutation(signinFn);

  return { signin: mutate, loading, error };
}

export { useSignin };
