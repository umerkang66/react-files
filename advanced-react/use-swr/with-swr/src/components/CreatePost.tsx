import { FC, FormEvent, useState } from 'react';
import Loader from './Loader';
import type { KeyedMutator } from 'swr';
import { axiosInstance as axios } from 'src/utils';
import { IPost } from '@libs/types';

type Event = FormEvent<HTMLFormElement>;

const CreatePost: FC<{ mutate: KeyedMutator<IPost[][]> }> = ({ mutate }) => {
  const [content, setContent] = useState('');
  const loading = false;

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    const optimisticPost = (id: number): IPost => ({
      id,
      content,
      createdAt: new Date(),
      clientOnly: true,
    });

    // Optimistic UI Updates
    mutate(
      posts => {
        return [
          [optimisticPost(((posts && posts[0] && posts[0][0].id) || 0) + 1)],
          ...(posts as IPost[][]),
        ];
      },
      // false means don't refetch the query
      false
    );

    setContent('');

    await axios.post('/posts', {
      content,
      createdAt: Date.now(),
    });

    /*
      // we can also mutate the query, just by adding the data from returned from axios
      mutate<IPost[]>(
        '/posts?_sort=createdAt&_order=desc',
        posts => [data, ...(posts as IPost[])],
        false
      );
    */

    // default means refetch the data, and mutate it with the data that is fetch by this query
    // refresh the query
    mutate();
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-50 ">
      <textarea
        cols={3}
        className="form-control"
        placeholder="Write your dream post:)"
        onChange={e => setContent(e.target.value)}
        value={content}
      ></textarea>
      <button
        style={{ width: '120px' }}
        className="btn btn-outline-warning"
        type="submit"
      >
        {loading ? <Loader /> : 'Add Post'}
      </button>
    </form>
  );
};

export default CreatePost;
