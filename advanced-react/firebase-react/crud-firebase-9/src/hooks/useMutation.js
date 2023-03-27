import { useRequest } from './useRequest';

function useMutation(mutationFn) {
  const { doRequest, data, loading, error } = useRequest(mutationFn);

  return { mutate: doRequest, data, loading, error };
}

export { useMutation };
