import { useMutation, useQueryClient } from '@tanstack/react-query';
import { StatusSelect } from './StatusSelect';
import { fetchWithError } from '../helpers/fetchWithError';

export function IssueStatus({ status, issueNumber }) {
  const queryClient = useQueryClient();

  const setStatusMutation = useMutation(
    status =>
      fetchWithError(`/api/issues/${issueNumber}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      }),
    {
      // this is the same that is passed to mutate function
      onMutate: status => {
        const oldStatus = queryClient.getQueryData([
          'issues',
          issueNumber,
        ]).status;

        queryClient.setQueryData(['issues', issueNumber], currentData => ({
          ...currentData,
          status,
        }));

        // whatever we return from here, can be accessed from other callback functions
        return function rollback() {
          queryClient.setQueryData(['issues', issueNumber], data => ({
            ...data,
            status: oldStatus,
          }));
        };
      },
      onError: (error, variables, rollback) => {
        // rollback to the original data
        rollback();
      },
      onSuccess: (data, variables, rollback) => {
        // we do nothing here
      },
      onSettled: () => {
        // Once query is completed (error or success), refetch the data, to keep it updated
        queryClient.invalidateQueries(['issues', issueNumber], { exact: true });
      },
    }
  );

  return (
    <div className="issue-options">
      <div>
        <span>Status</span>
        <StatusSelect
          noEmptyOption
          value={status}
          onChange={e => {
            setStatusMutation.mutate(e.target.value);
          }}
        />
      </div>
    </div>
  );
}
