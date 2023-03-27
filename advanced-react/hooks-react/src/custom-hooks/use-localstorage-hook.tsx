import { useState, Dispatch, useEffect } from 'react';

function getSavedValue<T>(key: string, initialValue: T | (() => T)): T {
  const savedString = localStorage.getItem(key);
  if (savedString) {
    return JSON.parse(savedString) as T;
  }
  if (initialValue instanceof Function) {
    return initialValue();
  }
  return initialValue;
}

export default function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    return getSavedValue(key, initialValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}
