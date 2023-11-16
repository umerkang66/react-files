import { type NextPage } from 'next';
import { AdminLayout } from '@/components/layout/admin-layout';
import { useRouter } from 'next/router';
import { useSearchPosts } from '@/hooks/post-hooks';
import { InfiniteScrollPosts } from '@/components/common/infinite-scroll-posts';

type Props = {};

const Search: NextPage<Props> = () => {
  const router = useRouter();
  const query = router.query.query as string;

  const { posts, loading, updatePosts, refetchPosts } = useSearchPosts(query);

  return (
    <AdminLayout>
      {!loading && !posts.length && (
        <h1 className="text-center text-3xl font-semibold text-secondary-dark opacity-40 dark:text-secondary-light">
          Not Found
        </h1>
      )}

      {loading && (
        <h1 className="text-center text-3xl font-semibold text-secondary-dark opacity-40 dark:text-secondary-light">
          Searching...
        </h1>
      )}

      <InfiniteScrollPosts
        deletedPostId={id => {
          updatePosts(prev => ({
            posts: prev.posts.filter(post => post.id !== id),
          }));
          refetchPosts();
        }}
        hasMore={false}
        next={() => {}}
        dataLength={posts.length}
        posts={posts}
        showControls
      />
    </AdminLayout>
  );
};

export default Search;
