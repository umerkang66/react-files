import { IUser } from '@/types';
import { useFetch } from './use-fetch';

export function useUsers(limit?: number) {
  const { data, updateData, refetch } = useFetch({
    key: 'users/fetch',
    defaultValue: { users: [] as IUser[] },
    fetchOnMount: true,
    url: `/api/users?limit=${limit}`,
  });

  return {
    users: data.users,
    updateUsers: updateData,
    refetchUsers: refetch,
  };
}

export function usePaginatedUsers(page: number, limit: number = 5) {
  const { data, fetching } = useFetch({
    key: `users/fetch/${page}`,
    defaultValue: { users: [] as IUser[] },
    fetchOnMount: true,
    url: `/api/users?page=${page}&limit=${limit}`,
  });

  return { users: data.users, loading: fetching };
}
