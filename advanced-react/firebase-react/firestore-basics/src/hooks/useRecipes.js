import useSWR from 'swr';
import { projectFirestore } from '../firebase/config';
import { keys } from '../utils/hookKeys';

const normalizeRecipes = recipeDocs => {
  return recipeDocs
    .map(doc => ({ id: doc.id, ...doc.data() }))
    .sort((a, b) => b.createdAt - a.createdAt);
};

const recipesFetcher = async () => {
  const snapshot = await projectFirestore.collection('recipes').get();

  return normalizeRecipes(snapshot.docs);
};

export function useRecipes() {
  const { data, error, isLoading } = useSWR(keys.recipes, recipesFetcher);

  return { data, isLoading, error };
}
