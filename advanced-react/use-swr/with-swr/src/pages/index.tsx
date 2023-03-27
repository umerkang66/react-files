import CreatePost from '@components/CreatePost';
import PostCard from '@components/PostCard';
import Loader from '@components/Loader';
import { IPost } from '@libs/types';
import { usePagination } from '@libs/hooks';
import InfiniteScroll from 'react-infinite-scroll-component';

function Home() {
  /*
  const { data: posts, isLoading } = useSWR<IPost[]>(
    '/posts?_sort=createdAt&_order=desc'
  );
  */

  const { data, isLoading, setSize, isAtEnd, mutate } = usePagination<IPost>(
    '/posts?_sort=createdAt&_order=desc',
    4
  );

  return (
    <div>
      <h4>useSWR Hook ⛳</h4>
      <CreatePost mutate={mutate} />

      <h4>Posts</h4>

      {isLoading ? (
        <Loader />
      ) : (
        <InfiniteScroll
          next={() => setSize(size => size + 1)}
          hasMore={!isAtEnd}
          loader={<Loader />}
          endMessage={
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              <p>Reached to the end</p>
            </div>
          }
          dataLength={(data && data.length) || 0}
        >
          {data &&
            data.map(post => {
              return <PostCard key={post.id} data={post} />;
            })}
        </InfiniteScroll>
      )}
    </div>
  );
}

export default Home;
