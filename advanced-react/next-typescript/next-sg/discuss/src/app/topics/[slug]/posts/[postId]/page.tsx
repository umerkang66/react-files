import Link from 'next/link';
import PostShow from '@/components/posts/post-show';
import CommentList from '@/components/comments/comment-list';
import CommentCreateForm from '@/components/comments/comment-create-form';
import { paths } from '@/paths';
import { Suspense } from 'react';

interface PostShowPageProps {
  params: {
    slug: string;
    postId: string;
  };
}

async function PostShowPage({ params }: PostShowPageProps) {
  const { slug, postId } = params;

  return (
    <div className="space-y-3">
      <Link className="underline decoration-solid" href={paths.topicShow(slug)}>
        {'< '}Back to {slug}
      </Link>
      <Suspense fallback={<div>Loading...</div>}>
        <PostShow postId={params.postId} />
      </Suspense>
      <CommentCreateForm postId={postId} startOpen />
      <CommentList postId={postId} />
    </div>
  );
}

export default PostShowPage;
