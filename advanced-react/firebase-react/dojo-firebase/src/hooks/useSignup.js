import { useState, useEffect } from 'react';
import {
  projectAuth,
  projectStorage,
  projectFirestore,
} from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName, thumbnail) => {
    setError(null);
    setIsPending(true);

    try {
      // signup
      const res = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      if (!res) {
        throw new Error('Could not complete signup');
      }

      // upload user thumbnail
      const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`;

      // ref (folder path) where to store the image, then uploads the file into the place
      const uploadedImage = await projectStorage.ref(uploadPath).put(thumbnail);

      // now we need the photo url to pass into the firestore
      const imgUrl = await uploadedImage.ref.getDownloadURL();

      // add display AND PHOTO_URL name to user
      await res.user.updateProfile({ displayName, photoURL: imgUrl });

      // create a user document
      await projectFirestore.collection('users').doc(res.user.uid).set({
        online: true,
        displayName,
        photoURL: imgUrl,
      });

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user });

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { signup, error, isPending };
};
