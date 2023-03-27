import { useEffect } from 'react';
import { useRouter } from 'next/router';

import CreateComment from '@components/CreateComment';
import CommentCard from '@components/CommentCard';
import PostCard from '@components/PostCard';

import { commentsFetcher, postFetcher } from 'src/utils/api';
import { useQuery } from 'src/hooks/use-query';
import Loader from '@components/Loader';

function PostDetail() {
  const router = useRouter();
  const postId = router.query.postId;

  const [fetchPost, post, postLoading] = useQuery(postFetcher, [
    'posts',
    postId as string,
  ]);
  const [fetchComments, comments, commentLoading] = useQuery(commentsFetcher, [
    'posts',
    postId as string,
    'comments',
  ]);

  useEffect(() => {
    if (postId) {
      fetchPost(postId as string);
      fetchComments(postId as string);
    }
  }, [postId]);

  return (
    <div>
      {postLoading || commentLoading ? (
        <Loader />
      ) : (
        <>
          {post && <PostCard data={post} />}
          <CreateComment postId={postId as string} />
          <h4>Comments</h4>
          {comments &&
            comments.map(comment => (
              <CommentCard key={comment.id} data={comment} />
            ))}
        </>
      )}
    </div>
  );
}

export default PostDetail;
