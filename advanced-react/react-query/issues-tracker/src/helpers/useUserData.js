import { useQuery } from '@tanstack/react-query';
import { fetchWithError } from './fetchWithError';

export function useUserData(userId) {
  const usersQuery = useQuery(
    ['users', userId],
    ({ signal }) => fetchWithError(`/api/users/${userId}`, { signal }),
    // automatic refetch will not occur till 5 minutes after the query
    { staleTime: 1000 * 60 * 5 } // 5minutes
  );

  return usersQuery;
}
