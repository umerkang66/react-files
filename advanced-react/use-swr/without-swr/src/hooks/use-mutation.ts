import type { AxiosError } from 'axios';
import { useState } from 'react';

export function useMutation<T extends (...args: any) => any>(func: T) {
  type Data = Awaited<ReturnType<T>>;

  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const mutateData = async (...args: Parameters<T>) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      // even if data is found still fetch the data
      const data = await func(...args);

      setLoading(false);
      setData(data);
    } catch (err: any) {
      setLoading(false);
      setError(err);
    }
  };

  return [mutateData, data, loading, error] as const;
}
