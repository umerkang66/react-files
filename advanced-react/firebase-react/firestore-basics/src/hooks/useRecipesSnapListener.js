import { useEffect, useState } from 'react';
import { projectFirestore } from '../firebase/config';

const normalizeRecipes = recipeDocs =>
  recipeDocs.map(doc => ({ id: doc.id, ...doc.data() }));

export function useRecipesSnapListener() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    const unsub = projectFirestore.collection('recipes').onSnapshot(
      snapshot => {
        if (snapshot.empty) {
          return setError(new Error('No Recipes found'));
        }
        setData(normalizeRecipes(snapshot.docs));
        setIsLoading(false);
      },
      err => {
        setError(new Error(err.message));
        setIsLoading(false);
      }
    );

    return () => unsub();
  }, []);

  return {
    data,
    isLoading,
    error,
  };
}
