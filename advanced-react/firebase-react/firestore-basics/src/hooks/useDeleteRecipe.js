import useSWRMutation from 'swr/mutation';
import { mutate } from 'swr';
import { keys } from '../utils/hookKeys';
import { useCallback } from 'react';
import { projectFirestore } from '../firebase/config';

// this 'arg' extraArgument is coming from swr mutation function
const deleteRecipeFetcher = (_, { arg: id }) => {
  return projectFirestore.collection('recipes').doc(id).delete();
};

export function useDeleteRecipe() {
  const { error, isMutating, trigger } = useSWRMutation(
    keys.deleteRecipe,
    deleteRecipeFetcher
  );

  const deleteRecipe = useCallback(
    async id => {
      await trigger(id);
      // returns the promise
      return mutate(keys.recipes);
    },
    [trigger]
  );

  return {
    error,
    isLoading: isMutating,
    deleteRecipe,
  };
}
