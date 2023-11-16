import { type FC, type FormEvent, useState } from 'react';
import { useMutation } from 'src/hooks/use-mutation';
import { getQuery } from 'src/hooks/use-query';
import { createCommentMutation } from 'src/utils/api';
import Loader from './Loader';

type Event = FormEvent<HTMLFormElement>;

const CreateComment: FC<{ postId: string }> = ({ postId }) => {
  const [comment, setComment] = useState('');

  const [createComment, _, loading] = useMutation(createCommentMutation);
  // type is what will be the arguments of getComment query function
  const query = getQuery<(postId: string) => void>([
    'posts',
    postId,
    'comments',
  ]);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    await createComment({
      postId,
      content: comment,
      timestamps: Date.now(),
    });

    if (query) {
      const getComments = query[0];
      getComments(postId);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-50">
      <textarea
        cols={3}
        className="form-control"
        placeholder="Write your dream comment:)"
        onChange={e => setComment(e.target.value)}
        value={comment}
      ></textarea>
      <button
        className="btn btn-outline-warning"
        style={{ width: '150px' }}
        type="submit"
      >
        {loading ? <Loader /> : 'Add comment'}
      </button>
    </form>
  );
};

export default CreateComment;
