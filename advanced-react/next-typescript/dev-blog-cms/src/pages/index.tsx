import type {
  GetStaticProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';

import { InfiniteScrollPosts } from '@/components/common/infinite-scroll-posts';
import { DefaultLayout } from '@/components/layout/default-layout';
import type { IPost } from '@/types';
import { getPosts } from '@/lib/server-utils-for-client';
import { usePaginatedPosts } from '@/hooks/post-hooks';
import { useUser } from '@/hooks/use-user';

type Props = InferGetServerSidePropsType<typeof getStaticProps>;

const Home: NextPage<Props> = ({ posts }) => {
  const { user } = useUser();
  const isAdmin = user?.role === 'admin';

  const { fetchMorePosts, totalPosts, hasMorePosts, updateTotalPosts } =
    usePaginatedPosts({ defaultPosts: posts, limit: 9 });

  return (
    <DefaultLayout>
      <div className="p-20">
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
          showControls={isAdmin}
        />
      </div>
    </DefaultLayout>
  );
};

type R = { posts: IPost[] };

export const getStaticProps: GetStaticProps<R> = async () => {
  return { props: { posts: await getPosts({ page: 1, limit: 9 }) } };
};

export default Home;
