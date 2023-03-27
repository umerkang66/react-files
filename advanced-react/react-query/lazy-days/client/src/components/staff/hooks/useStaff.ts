import { useQuery } from '@tanstack/react-query';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';

import type { Staff } from '../../../../../shared/types';
import { axiosInstance } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';
import { filterByTreatment } from '../utils';

// for when we need a query function for useQuery
async function getStaff(): Promise<Staff[]> {
  const { data } = await axiosInstance.get('/staff');
  return data;
}

interface UseStaff {
  staff: Staff[];
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
}

export function useStaff(): UseStaff {
  // for filtering staff by treatment
  const [filter, setFilter] = useState('all');

  // selectors will run on every render, if our transformation is expensive, we can memoize it
  const selectFn: (data: Staff[]) => Staff[] = useCallback(
    (data) => {
      // data will be passed into this function, before passing to the useQuery 'results'

      return filterByTreatment(data, filter);
    },
    [filter],
  );

  const { data: staff = [] } = useQuery([queryKeys.staff], getStaff, {
    select: filter !== 'all' ? selectFn : undefined,
  });

  return { staff, filter, setFilter };
}
