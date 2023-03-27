import useSWRMutation from 'swr/mutation';
import { mutate } from 'swr';
import { keys } from '../utils/hookKeys';
import { useCallback } from 'react';
import { projectFirestore } from '../firebase/config';
import { toast } from 'react-hot-toast';

// this 'arg' extraArgument is coming from swr mutation function
const createRecipeFetcher = (_, { arg: data }) => {
  return projectFirestore.collection('recipes').add(data);
};

export function useCreateRecipe() {
  const { data, error, isMutating, trigger } = useSWRMutation(
    keys.createRecipe,
    createRecipeFetcher
  );

  const createRecipe = useCallback(
    async data => {
      await trigger(data);
      // no need to mutate the recipes, because when will change routes, swr refetches will occur
      toast.success('Recipe is successfully created');
    },
    [trigger]
  );

  return {
    data,
    error,
    isLoading: isMutating,
    createRecipe,
  };
}
