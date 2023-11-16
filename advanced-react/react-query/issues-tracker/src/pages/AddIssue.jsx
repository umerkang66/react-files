import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { fetchWithError } from '../helpers/fetchWithError';

const addIssueFn = issueBody => {
  return fetchWithError('/api/issues', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(issueBody),
  });
};

function AddIssue() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const addIssueMutation = useMutation(addIssueFn, {
    onSuccess: data => {
      queryClient.setQueryData(['issues', data.number.toString()], data);

      navigate(`/issue/${data.number}`);
    },
    onSettled: data => {
      queryClient.invalidateQueries(['issues', data.number.toString()], {
        exact: true,
      });
    },
  });

  return (
    <div className="add-issue">
      <h2>Add Issue</h2>
      <form
        onSubmit={event => {
          event.preventDefault();
          if (addIssueMutation.isLoading) return;
          addIssueMutation.mutate({
            comment: event.target.comment.value,
            title: event.target.title.value,
          });
        }}
      >
        <label htmlFor="title">Title</label>
        <input type="text" id="title" placeholder="Title" name="title" />
        <label htmlFor="comment">Comment</label>
        <textarea placeholder="Comment" id="comment" name="comment" />
        <button type="submit" disabled={addIssueMutation.isLoading}>
          {addIssueMutation.isLoading ? 'Adding Issue...' : 'Add Issue'}
        </button>
      </form>
    </div>
  );
}

export default AddIssue;
