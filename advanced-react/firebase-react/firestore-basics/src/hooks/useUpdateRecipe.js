import useSWRMutation from 'swr/mutation';
import { mutate } from 'swr';
import { keys } from '../utils/hookKeys';
import { useCallback } from 'react';
import { projectFirestore } from '../firebase/config';
import { toast } from 'react-hot-toast';

// this 'arg' extraArgument is coming from swr mutation function
const updateRecipeFetcher = (_, { arg }) => {
  return projectFirestore.collection('recipes').doc(arg.id).update(arg.data);
};

export function useUpdateRecipe() {
  const { error, isMutating, trigger } = useSWRMutation(
    keys.updateRecipe,
    updateRecipeFetcher
  );

  const updateRecipe = useCallback(
    async ({ id, data }) => {
      // optimistic ui update
      mutate(keys.recipe(id), recipe => ({ ...recipe, title: data.title }), {
        rollbackOnError: true,
      });

      await trigger({ id, data });
      toast.success('Recipe is successfully updated');
      // returns the promise
      return mutate(keys.recipe(id));
    },
    [trigger]
  );

  return {
    error,
    isLoading: isMutating,
    updateRecipe,
  };
}
