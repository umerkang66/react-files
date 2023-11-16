import { useCallback, useState } from 'react';

const cache = {};

function useRequest(asyncFn, queryKey) {
  // if queryKey is defined, use have to use cache
  const [data, setData] = useState(queryKey ? cache[queryKey] : null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const doRequest = useCallback(async (...args) => {
    setLoading(queryKey && cache[queryKey] ? false : true);
    setError(null);

    try {
      const data = await asyncFn(...args);
      if (queryKey) {
        cache[queryKey] = data;
      }

      setData(data);
      setLoading(false);
    } catch (err) {
      setError(err?.message || 'Something went wrong');
      setLoading(false);
    }
  }, []);

  const mutate = useCallback((...args) => {
    if (queryKey) doRequest(...args);
  }, []);

  return { doRequest, mutate, data, loading, error };
}

export { useRequest };
