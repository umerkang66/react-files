import { act, renderHook } from '@testing-library/react-hooks';

import { createQueryClientWrapper } from '../../../test-utils';
import { useAppointments } from '../hooks/useAppointments';

test('filter appointments by availability', async () => {
  const { result, waitFor } = renderHook(useAppointments, {
    // this should return a react component, because, it is going to use this hook
    wrapper: createQueryClientWrapper(),
  });

  // waitFor the appointments to populate
  // see if appointments, are not empty object
  // 'result.current' is the actual result of the hook
  await waitFor(
    () => JSON.stringify(result.current.appointments) !== JSON.stringify({}),
  );

  const filteredAppointmentsLength = Object.keys(
    result.current.appointments,
  ).length;

  // set to show all the appointments
  // act actually makes the change to the hook
  act(() => result.current.setShowAll(true));

  // wait for the appointments to show more than when filtered
  await waitFor(
    () =>
      Object.keys(result.current.appointments).length >
      filteredAppointmentsLength,
  );
});
