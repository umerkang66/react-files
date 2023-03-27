import {
  UseMutateFunction,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import jsonpatch from 'fast-json-patch';

import type { User } from '../../../../../shared/types';
import { axiosInstance, getJWTHeader } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';
import { useCustomToast } from '../../app/hooks/useCustomToast';
import { useUser } from './useUser';

// for when we need a server function
async function patchUserOnServer(
  newData: User | null,
  originalData: User | null,
): Promise<User | null> {
  if (!newData || !originalData) return null;
  // create a patch for the difference between newData and originalData
  const patch = jsonpatch.compare(originalData, newData);

  // send patched data to the server
  const { data } = await axiosInstance.patch(
    `/user/${originalData.id}`,
    { patch },
    { headers: getJWTHeader(originalData) },
  );
  return data.user;
}

// TODO: update type to UseMutateFunction type
export function usePatchUser(): UseMutateFunction<
  User,
  unknown,
  User,
  unknown
> {
  const queryClient = useQueryClient();
  const toast = useCustomToast();
  const { user, updateUser } = useUser();

  const { mutate } = useMutation(
    (newData: User) => patchUserOnServer(newData, user),
    {
      async onMutate(newData) {
        // for optimistic updates
        // cancel any outgoing queries for userData, so it doesn't override our optimistic updates
        // for safety, if some queries are running, stop them
        queryClient.cancelQueries([queryKeys.user]);

        // get the value of previousSnapshot
        // this will be used in the onError
        const previousUserData = queryClient.getQueryData([
          queryKeys.user,
        ]) as User;

        // optimistically updates the cache with the new data
        updateUser({ ...newData, temporary: true });

        // returns the context (previous use value), that will be fed to the 'onError' callback
        return { previousUserData };
      },
      onError(err, newData, context) {
        // roll back the cache to the same value
        if (context.previousUserData) {
          updateUser(context.previousUserData);

          toast({
            title: 'Update failed, restoring previous value',
            status: 'error',
          });
        }
      },
      onSuccess: (updatedUser) => {
        updateUser(updatedUser);
        toast({ title: 'User updated successfully', status: 'success' });
      },
      onSettled(data, error, variables, context) {
        // whether it is error or success, this will be called
        // invalidate the query of the user, just as a good practice, for the latest data
        queryClient.invalidateQueries([queryKeys.user]);
      },
    },
  );

  return mutate;
}
