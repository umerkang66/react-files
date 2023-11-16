import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { GoGear } from 'react-icons/go';
import { fetchWithError } from '../helpers/fetchWithError';
import { useUserData } from '../helpers/useUserData';

export function IssueAssignment({ assignee, issueNumber }) {
  const queryClient = useQueryClient();
  const user = useUserData(assignee);
  const [menuOpen, setMenuOpen] = useState(false);
  const usersQuery = useQuery(['users'], () => fetchWithError('/api/users'));

  const setAssignmentMutation = useMutation(
    assignee =>
      fetchWithError(`/api/issues/${issueNumber}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ assignee }),
      }),
    {
      // this is the same that is passed to mutate function
      onMutate: assignee => {
        const oldAssignee = queryClient.getQueryData([
          'issues',
          issueNumber,
        ]).assignee;

        queryClient.setQueryData(['issues', issueNumber], currentData => ({
          ...currentData,
          assignee,
        }));

        // whatever we return from here, can be accessed from other callback functions
        return function rollback() {
          queryClient.setQueryData(['issues', issueNumber], data => ({
            ...data,
            assignee: oldAssignee,
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
        <span>Assignment</span>
        {user.isSuccess && (
          <div>
            <img src={user.data.profilePictureUrl} />
            {user.data.name}
          </div>
        )}
      </div>
      <GoGear
        onClick={() => !usersQuery.isLoading && setMenuOpen(prev => !prev)}
      />
      {menuOpen && (
        <div className="picker-menu">
          {usersQuery.data?.map(user => (
            <div
              key={user.id}
              onClick={() => setAssignmentMutation.mutate(user.id)}
            >
              <img src={user.profilePictureUrl} alt={user.name} />
              {user.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
