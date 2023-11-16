import axios, { type AxiosRequestConfig } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { ICustomError } from '@/types';

const cache: any = {};

type Props<T> = {
  url?: string;
  defaultValue: T;
  config?: AxiosRequestConfig;
  // if this is false, we have to manually fetch the data,
  // that is required in pagination
  fetchOnMount?: boolean;
  key?: string;
  onFetch?: (data: T) => void;
  dontAddFromCacheBeforeFetching?: boolean;
};

export function useFetch<T>(props: Props<T>) {
  const {
    url,
    defaultValue,
    config,
    fetchOnMount = true,
    key,
    onFetch,
    dontAddFromCacheBeforeFetching = false,
  } = props;
  const [isFirstTimeFetching, setIsFirstTimeFetching] = useState(true);

  const [data, setData] = useState<T>(() =>
    key && cache[key] ? { ...cache[key] } : defaultValue,
  );
  const [error, setError] = useState<ICustomError[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  const fetchData = useCallback(
    async (scopedUrl?: string) => {
      if (isFirstTimeFetching) setLoading(true);
      setFetching(true);
      setError(null);
      if (!dontAddFromCacheBeforeFetching)
        setData(prev => (key && cache[key] ? { ...cache[key] } : prev));

      try {
        const { data } = await axios.get(url || scopedUrl!, config);
        if (key) cache[key] = data;
        onFetch && onFetch(data);
        setData(data);
      } catch (err: any) {
        const error = err.response.data.error as ICustomError[];
        if (error) {
          const messages = error.map(
            ({ message, field }) => `${field ? `${field}: ` : ''}${message}`,
          );
          messages.forEach(msg => toast.error(msg));
        }
        setError(error);
      } finally {
        setLoading(false);
        setFetching(false);
        setIsFirstTimeFetching(false);
      }
    },
    [
      url,
      config,
      isFirstTimeFetching,
      key,
      onFetch,
      dontAddFromCacheBeforeFetching,
    ],
  );

  const updateData = (fn: (prev: T) => T) => {
    setData(fn(data!));
  };

  useEffect(() => {
    if (fetchOnMount) fetchData();
  }, [fetchData, fetchOnMount]);

  const refetch = useCallback(
    async (scopedUrl?: string) => {
      fetchData(scopedUrl);
    },
    [fetchData],
  );

  return {
    fetchData,
    data,
    error,
    loading,
    fetching,
    updateData,
    refetch,
  };
}
