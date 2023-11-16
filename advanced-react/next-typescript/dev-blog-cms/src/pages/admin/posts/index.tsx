import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';

import { AdminLayout } from '@/components/layout/admin-layout';
import { IPost } from '@/types';
import { getPosts } from '@/lib/server-utils-for-client';
import { InfiniteScrollPosts } from '@/components/common/infinite-scroll-posts';
import { usePaginatedPosts } from '@/hooks/post-hooks';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const Posts: NextPage<Props> = ({ posts }) => {
  const { fetchMorePosts, totalPosts, hasMorePosts, updateTotalPosts } =
    usePaginatedPosts({ defaultPosts: posts, limit: 9 });

  return (
    <>
      <AdminLayout>
        <h1 className="py-4 text-2xl font-semibold text-primary-dark underline dark:text-primary">
          All Posts
        </h1>
        <InfiniteScrollPosts
          deletedPostId={id =>
            updateTotalPosts(prev => prev.filter(post => post.id !== id))
          }
          hasMore={hasMorePosts}
          next={() => fetchMorePosts({ skip: totalPosts.length })}
          dataLength={totalPosts.length}
          posts={totalPosts}
          showControls
        />
      </AdminLayout>
    </>
  );
};

type R = { posts: IPost[] };
export const getServerSideProps: GetServerSideProps<R> = async () => {
  const posts = await getPosts({ page: 1, limit: 9 });
  return { props: { posts } };
};

export default Posts;
