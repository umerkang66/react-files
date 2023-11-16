import { useEffect } from 'react';

import CreatePost from '@components/CreatePost';
import PostCard from '@components/PostCard';
import Loader from '@components/Loader';
import { useQuery } from 'src/hooks/use-query';
import { postsFetcher } from 'src/utils/api';

function Home() {
  const [getPosts, posts, loading] = useQuery(postsFetcher, 'posts');

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <h4>useSWR Hook ⛳</h4>
      <CreatePost />

      <h4>Posts</h4>

      {loading ? (
        <Loader />
      ) : (
        posts && posts.map(post => <PostCard key={post.id} data={post} />)
      )}
    </div>
  );
}

export default Home;
