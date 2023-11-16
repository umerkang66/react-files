import { useRouter } from 'next/router';

import CreateComment from '@components/CreateComment';
import CommentCard from '@components/CommentCard';
import PostCard from '@components/PostCard';

import Loader from '@components/Loader';
import useSWR from 'swr';

import { IComment, IPost } from '@libs/types';
import { usePagination } from '@libs/hooks';
import InfiniteScroll from 'react-infinite-scroll-component';

function PostDetail() {
  const router = useRouter();
  const postId = router.query.postId;

  // Because posts are already fetched inside the main route, useSWR will use the cache
  const { data: posts, isLoading } = useSWR<IPost[]>(
    '/posts?_sort=createdAt&_order=desc'
  );

  const post = posts?.find(post => post.id === +(postId as string));

  const {
    data: comments,
    isLoading: commentsLoading,
    setSize,
    isAtEnd,
    mutate,
  } = usePagination<IComment>(
    `/posts/${postId}/comments?_sort=createdAt&_order=desc`,
    8
  );

  return (
    <div>
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
          dataLength={(comments && comments.length) || 0}
        >
          {post && <PostCard data={post} />}
          <CreateComment postId={postId as string} mutate={mutate} />
          <h4>Comments</h4>
          {comments &&
            comments.map(comment => (
              <CommentCard key={comment.id} data={comment} />
            ))}
        </InfiniteScroll>
      )}
    </div>
  );
}

export default PostDetail;
