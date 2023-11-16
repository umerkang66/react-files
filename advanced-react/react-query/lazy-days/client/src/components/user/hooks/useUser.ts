import { useQuery, useQueryClient } from '@tanstack/react-query';

import type { User } from '../../../../../shared/types';
import { axiosInstance, getJWTHeader } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';
import {
  clearStoredUser,
  getStoredUser,
  setStoredUser,
} from '../../../user-storage';

// 'signal' will make this function cancelable
async function getUser(user: User | null, signal: AbortSignal): Promise<User> {
  if (!user) return null;

  const { data } = await axiosInstance.get(`/user/${user.id}`, {
    headers: getJWTHeader(user),
    signal,
  });

  return data.user;
}

interface UseUser {
  user: User | null;
  updateUser: (user: User) => void;
  clearUser: () => void;
}

export function useUser(): UseUser {
  const queryClient = useQueryClient();

  const { data: user } = useQuery(
    [queryKeys.user],
    ({ signal }) => getUser(user, signal),
    { initialData: getStoredUser },
  );

  // meant to be called from useAuth
  function updateUser(newUser: User): void {
    queryClient.setQueryData([queryKeys.user], newUser);

    setStoredUser(newUser);
  }

  // meant to be called from useAuth
  function clearUser() {
    queryClient.setQueryData([queryKeys.user], null);

    clearStoredUser();

    // this also uses a queryKey prefix
    queryClient.removeQueries([queryKeys.appointments, queryKeys.user]);
  }

  return { user, updateUser, clearUser };
}
