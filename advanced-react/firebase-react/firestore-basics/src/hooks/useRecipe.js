import useSWR from 'swr';
import { projectFirestore } from '../firebase/config';
import { keys } from '../utils/hookKeys';

const normalizeRecipe = recipeDoc => ({
  id: recipeDoc.id,
  ...recipeDoc.data(),
});

const recipeFetcher = async key => {
  // see the 'hookKeys'
  const id = key.split('/')[1];
  const document = await projectFirestore.collection('recipes').doc(id).get();

  if (!document.exists) {
    throw new Error('Could not find that recipe');
  }

  return normalizeRecipe(document);
};

export function useRecipe(id) {
  const { data, error, isLoading } = useSWR(keys.recipe(id), recipeFetcher);

  return { data, isLoading, error };
}
