import axios, { AxiosRequestConfig } from 'axios';
import { useCallback, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { ICustomError } from '@/types';

type M = 'post' | 'delete' | 'patch';
type Props<T> = {
  url?: string;
  method: M;
  defaultValue: T;
  config?: AxiosRequestConfig;
  onMutate?: (data: T) => void;
};

export function useMutation<T>(props: Props<T>) {
  let { url, method, defaultValue, config, onMutate } = props;

  defaultValue = useRef(defaultValue).current;
  config = useRef(config).current;

  const [data, setData] = useState<T>(() => defaultValue);
  const [error, setError] = useState<ICustomError[] | null>(null);
  const [mutating, setMutating] = useState(false);

  const mutateData = useCallback(
    async (body: any, scopedUrl?: string) => {
      setMutating(true);
      setError(null);
      setData(defaultValue);

      try {
        const { data: reqData } = await axios[method](
          scopedUrl ?? url!,
          body,
          config,
        );
        onMutate && onMutate(reqData);
        setData(reqData);
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
        setMutating(false);
      }

      return null;
    },
    [method, url, defaultValue, config, onMutate],
  );

  const updateData = (fn: (prev: T) => T) => {
    setData(prev => fn(prev));
  };

  return { data, error, mutating, mutateData, updateData };
}
