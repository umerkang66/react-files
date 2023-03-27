import useSWRInfinite from 'swr/infinite';

export const usePagination = <T>(url: string, limit: number = 4) => {
  const getKey = (pageIndex: number, previousData: T[]) => {
    if (previousData && previousData.length === 0) {
      // if key is null don't fire the request
      return null;
    }

    // This url acts as key and also for data fetching
    return `${url}&_page=${pageIndex + 1}&_limit=${limit}`;
  };

  const { data, setSize, isLoading, isValidating, mutate } =
    useSWRInfinite<T[]>(getKey);

  const flattedData = data?.flat();
  const isAtEnd = data && data[data.length - 1].length < limit;

  return {
    data: flattedData,
    setSize,
    isLoading,
    isValidating,
    isAtEnd,
    mutate,
  };
};
