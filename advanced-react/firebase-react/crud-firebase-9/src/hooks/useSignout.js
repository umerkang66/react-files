import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useMutation } from './useMutation';

const signoutFn = () => {
  return signOut(auth);
};

function useSignout() {
  const { mutate, loading, error } = useMutation(signoutFn);

  return { signout: mutate, loading, error };
}

export { useSignout };
