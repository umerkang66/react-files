import { SerializedError } from '@reduxjs/toolkit';

import { useCallback, useState } from 'react';
import { useAppDispatch } from './use-app-dispatch';

export function useThunk<T extends (...args: Parameters<T>) => any>(
  thunkAction: T
) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<SerializedError | null>(null);

  // dispatch function returns a promise that will
  // always resolve (with success action payload,
  // or error action payload)
  const dispatch = useAppDispatch();

  const runThunkAction = useCallback(
    (...args: Parameters<T>) => {
      setIsLoading(true);

      // "args" are actually array
      // thunkAction.apply(null, args)
      dispatch(thunkAction(...args))
        .unwrap()
        .catch((err: SerializedError) => setError(err))
        .finally(() => setIsLoading(false));
    },
    [dispatch, thunkAction]
  );

  // this returns a tuple
  return [runThunkAction, isLoading, error] as const;
}
