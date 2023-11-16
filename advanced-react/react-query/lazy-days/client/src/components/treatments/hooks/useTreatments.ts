import { useQuery, useQueryClient } from '@tanstack/react-query';

import type { Treatment } from '../../../../../shared/types';
import { axiosInstance } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';

// for when we need a query function for useQuery
async function getTreatments(): Promise<Treatment[]> {
  const { data } = await axiosInstance.get('/treatments');
  return data;
}

export function useTreatments(): Treatment[] {
  const { data } = useQuery([queryKeys.treatments], getTreatments, {
    // means automatic refetch can only be done after 10 minutes
    staleTime: 10 * 60 * 1000, // 10 minutes
    // if cacheTime is expired, when the data should be re-fetched, there is no data to be shown while re-fetching, so increase the cacheTime also
    cacheTime: 11 * 60 * 1000, // 11 minutes
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return data || [];
}

export function usePrefetchTreatments(): void {
  const queryClient = useQueryClient();

  // this will set the value in the cache, that will be accessed form 'useTreatment' hook
  queryClient.prefetchQuery([queryKeys.treatments], getTreatments, {
    // refetchOn doesn't make sense here
    staleTime: 10 * 60 * 1000, // 10 minutes
    cacheTime: 11 * 60 * 1000, // 11 minutes
  });
}
