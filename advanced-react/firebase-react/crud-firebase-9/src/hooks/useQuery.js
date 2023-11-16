import { useEffect } from 'react';
import { useRequest } from './useRequest';

function useQuery(queryKey, queryFn) {
  const request = useRequest(queryFn, queryKey);
  const { doRequest, mutate, data, loading, error } = request;

  useEffect(() => {
    doRequest();
  }, []);

  return { mutate, data, loading, error };
}

export { useQuery };
