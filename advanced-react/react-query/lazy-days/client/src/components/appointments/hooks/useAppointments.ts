import { useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { axiosInstance } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';
import { useUser } from '../../user/hooks/useUser';
import { AppointmentDateMap } from '../types';
import { getAvailableAppointments } from '../utils';
import { getMonthYearDetails, getNewMonthYear, MonthYear } from './monthYear';

async function getAppointments(
  year: string,
  month: string,
): Promise<AppointmentDateMap> {
  const { data } = await axiosInstance.get(`/appointments/${year}/${month}`);
  return data;
}

interface UseAppointments {
  appointments: AppointmentDateMap;
  monthYear: MonthYear;
  updateMonthYear: (monthIncrement: number) => void;
  showAll: boolean;
  setShowAll: Dispatch<SetStateAction<boolean>>;
}

export function useAppointments(): UseAppointments {
  const queryClient = useQueryClient();

  const currentMonthYear = getMonthYearDetails(dayjs());

  const [monthYear, setMonthYear] = useState(currentMonthYear);

  function updateMonthYear(monthIncrement: number): void {
    setMonthYear((prevData) => getNewMonthYear(prevData, monthIncrement));
  }

  const [showAll, setShowAll] = useState(false);

  const { user } = useUser();

  const selectFn: (data: AppointmentDateMap) => AppointmentDateMap =
    useCallback(
      (data) => {
        // this function will get the data from useQuery, change it and then send it to the data that is used by component

        return getAvailableAppointments(data, user);
      },
      [user],
    );

  const { data: appointments = [] } = useQuery(
    [queryKeys.appointments, monthYear.year, monthYear.month],
    () => getAppointments(monthYear.year, monthYear.month),
    { select: showAll ? undefined : selectFn },
  );

  useEffect(() => {
    const newMonthYear = getNewMonthYear(monthYear, 1);

    queryClient.prefetchQuery(
      [queryKeys.appointments, newMonthYear.year, newMonthYear.month],
      () => getAppointments(newMonthYear.year, newMonthYear.month),
    );
  }, [queryClient, monthYear]);

  return {
    appointments,
    monthYear,
    updateMonthYear,
    showAll,
    setShowAll,
  };
}
