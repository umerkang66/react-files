import { useState } from 'react';
import type { AxiosError } from 'axios';

const getQueryCache: any = {};

interface QueryCache {
  [key: string]: any;
}

const queryCache: QueryCache = {};

function useQuery<T extends (...args: any) => any>(
  func: T,
  key: string | string[]
) {
  const normalizedKey = normalizeKey(key);
  type Data = Awaited<ReturnType<T>>;

  const [data, setData] = useState<Data | null>(
    queryCache[normalizedKey] || null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const fetchData = async (...args: Parameters<T>) => {
    // Data is already set so set the loading to false
    setLoading(queryCache[normalizedKey] ? false : true);
    setError(null);

    try {
      // even if data is found still fetch the data
      const data = await func(...args);
      queryCache[normalizedKey] = data;

      setLoading(false);
      setData(data);
    } catch (err: any) {
      setLoading(false);
      setError(err);
    }
  };

  const returnData = [fetchData, data, loading, error] as const;

  getQueryCache[normalizedKey] = returnData;
  return returnData;
}

function normalizeKey(key: string | string[]) {
  if (key instanceof Array) {
    return key.join('/');
  }
  return key;
}

type GetQueryReturned<T extends (...args: any) => any> =
  | [
      (...args: Parameters<T>) => Promise<void>,
      Awaited<ReturnType<T>> | null,
      boolean,
      AxiosError<unknown, any> | null
    ]
  | undefined;

function getQuery<T extends (...args: any) => any>(
  key: string | string[]
): GetQueryReturned<T> {
  const normalizedKey = normalizeKey(key);

  return getQueryCache[normalizedKey];
}

export { useQuery, getQuery };
