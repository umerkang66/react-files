import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { GoGear } from 'react-icons/go';
import { fetchWithError } from '../helpers/fetchWithError';
import { useLabelsData } from '../helpers/useLabelsData';

export function IssueLabels({ labels, issueNumber }) {
  const queryClient = useQueryClient();
  const labelsQuery = useLabelsData();
  const [menuOpen, setMenuOpen] = useState(false);

  const setLabelsMutation = useMutation(
    labelId => {
      const newLabels = labels.includes(labelId)
        ? labels.filter(currentLabel => currentLabel !== labelId)
        : [...labels, labelId];

      return fetchWithError(`/api/issues/${issueNumber}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ labels: newLabels }),
      });
    },
    {
      // this is the same that is passed to mutate function
      onMutate: labelId => {
        const oldLabels = queryClient.getQueryData([
          'issues',
          issueNumber,
        ]).labels;

        const newLabels = oldLabels.includes(labelId)
          ? oldLabels.filter(currentLabel => currentLabel !== labelId)
          : [...oldLabels, labelId];

        queryClient.setQueryData(['issues', issueNumber], currentData => ({
          ...currentData,
          labels: newLabels,
        }));

        // whatever we return from here, can be accessed from other callback functions
        return function rollback() {
          queryClient.setQueryData(['issues', issueNumber], data => {
            const rollbackLabels = oldLabels.includes(labelId)
              ? [...data.labels, labelId]
              : data.labels.filter(currentLabel => currentLabel !== labelId);

            return {
              ...data,
              labels: rollbackLabels,
            };
          });
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
        <span>Labels</span>
        {!labelsQuery.isLoading &&
          labels.map(label => {
            const labelObj = labelsQuery.data.find(
              queryLabel => queryLabel.id === label
            );

            if (!labelObj) return null;

            return (
              <span key={label} className={`label ${labelObj.color}`}>
                {labelObj.name}
              </span>
            );
          })}
      </div>
      <GoGear
        onClick={() => !labelsQuery.isLoading && setMenuOpen(prev => !prev)}
      />
      {menuOpen && (
        <div className="picker-menu labels">
          {labelsQuery.data?.map(label => {
            // 'labels' are the list of the labels that are coming through props
            const selected = labels.includes(label.id);

            return (
              <div
                key={label.id}
                className={selected ? 'selected' : ''}
                onClick={() => setLabelsMutation.mutate(label.id)}
              >
                <span
                  className="label-dot"
                  style={{ backgroundColor: label.color }}
                />
                {label.name}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
