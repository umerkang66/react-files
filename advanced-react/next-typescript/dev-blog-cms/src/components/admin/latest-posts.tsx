import { usePosts } from '@/hooks/post-hooks';
import { type FC } from 'react';
import { LatestPostCard } from './latest-post-card';

type Props = {};

const LatestPosts: FC<Props> = props => {
  // here we are providing the default posts, because posts can also be fetched through
  // getServerSideProps
  const { posts, updatePosts, refetchPosts } = usePosts({ defaultPosts: [] });

  const onDeletePost = (postId: string) => {
    updatePosts(prev => ({
      ...prev,
      posts: prev.posts.filter(({ id }) => id !== postId),
    }));

    refetchPosts();
  };

  return posts.map(post => (
    <LatestPostCard
      key={post.id}
      title={post.title}
      id={post.id}
      meta={post.meta}
      slug={post.slug}
      onDeletePost={onDeletePost}
    />
  ));
};

export { LatestPosts };
