import { type FC, type FormEvent, useState } from 'react';
import type { KeyedMutator } from 'swr';
import Loader from './Loader';
import { axiosInstance as axios } from 'src/utils';
import { IComment } from '@libs/types';

type Event = FormEvent<HTMLFormElement>;

const CreateComment: FC<{
  postId: string;
  mutate: KeyedMutator<IComment[][]>;
}> = ({ postId, mutate }) => {
  const [comment, setComment] = useState('');
  const loading = false;

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    const optimisticComment = (id: number): IComment => ({
      postId: +postId,
      id,
      content: comment,
      createdAt: new Date(),
      clientOnly: true,
    });

    // Optimistic UI Updates
    mutate(
      comments => [
        [
          optimisticComment(
            ((comments && comments[0] && comments[0][0] && comments[0][0].id) ||
              0) + 1
          ),
        ],
        ...(comments as IComment[][]),
      ],
      // false means don't refetch the query
      false
    );

    setComment('');

    await axios.post(`/posts/${postId}/comments`, {
      content: comment,
      createdAt: Date.now(),
      postId,
    });

    /*
      // we can also mutate the query, just by adding the data from returned from axios
      mutate<IPost[]>(
        '/posts?_sort=createdAt&_order=desc',
        posts => [data, ...(posts as IPost[])],
        false
      );
    */

    // default (not false) means refetch the data, and mutate it with the data that is fetch by this query
    mutate();
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
