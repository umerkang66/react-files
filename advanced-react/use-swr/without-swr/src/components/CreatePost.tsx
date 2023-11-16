import { FormEvent, useState } from 'react';
import { useMutation } from 'src/hooks/use-mutation';
import { getQuery } from 'src/hooks/use-query';
import { createPostMutation } from 'src/utils/api';
import Loader from './Loader';

type Event = FormEvent<HTMLFormElement>;

const CreatePost = () => {
  const [content, setContent] = useState('');

  const [createPost, _, loading] = useMutation(createPostMutation);
  // Add type of the function you want to returned
  const query = getQuery<() => void>('posts');

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    await createPost({ content, timestamps: Date.now() });

    if (query) {
      const getPosts = query[0];
      getPosts();
    }
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
