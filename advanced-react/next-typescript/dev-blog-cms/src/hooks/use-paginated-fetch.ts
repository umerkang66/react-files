import { useCallback, useRef, useState } from 'react';
import { useFetch } from './use-fetch';

const cache: any = {};

export function usePaginatedFetch<
  T extends { [key: string]: U[] },
  K extends keyof T,
  U,
>(props: {
  defaultValue: T;
  valueKey: K;
  lim?: number;
  hasMoreData: boolean;
  url: string;
  key?: string;
  furtherQueryParams?: string;
}) {
  const { url, defaultValue, valueKey, lim, key, furtherQueryParams } = props;
  const limit = useRef(lim ?? 9).current;

  const [totalData, setTotalData] = useState<T>(
    key && cache[key] ? cache[key] : defaultValue,
  );

  const { fetchData, fetching, loading, data } = useFetch({
    defaultValue: defaultValue,
    fetchOnMount: false,
    onFetch: data => {
      setTotalData(prev => {
        const newValue = {
          ...prev,
          [valueKey]: [...prev[valueKey], ...data[valueKey]],
        };
        if (key) cache[key] = newValue;
        return newValue;
      });
    },
  });

  const fetchMoreData = useCallback(
    async ({ page, skip }: { page?: number; skip?: number }) => {
      // content form page 1, will already be server rendered, so start
      // to fetch the content from page 2
      await fetchData(
        `${url}?page=${page}&limit=${limit}&skip=${skip}${furtherQueryParams}`,
      );
    },
    [fetchData, limit, url, furtherQueryParams],
  );

  const updateTotalData = (fn: (prev: T) => T) => {
    setTotalData(prev => fn(prev));
  };

  return {
    fetchMoreData,
    totalData,
    loading: fetching,
    firstTimeLoading: loading,
    updateTotalData,
    dataFetchedPerPage: data,
  };
}
