import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';

import { AdminLayout } from '@/components/layout/admin-layout';
import { getComments, getPosts } from '@/lib/server-utils-for-client';
import { usePaginatedComments } from '@/hooks/comment-hooks';
import { InfiniteScrollComments } from '@/components/common/infinite-scroll-comments';
import { IComment } from '@/types';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const Comments: NextPage<Props> = ({ comments }) => {
  const {
    fetchMoreComments,
    totalComments,
    hasMoreComments,
    updateTotalComments,
  } = usePaginatedComments({ defaultComments: comments, limit: 9 });

  return (
    <>
      <AdminLayout>
        <InfiniteScrollComments
          updateTotalComments={updateTotalComments}
          hasMore={hasMoreComments}
          next={() => fetchMoreComments({ skip: totalComments.length })}
          dataLength={totalComments.length}
          comments={totalComments}
        />
      </AdminLayout>
    </>
  );
};

type R = { comments: IComment[] };
export const getServerSideProps: GetServerSideProps<R> = async ({ req }) => {
  const comments = await getComments({ page: 1, limit: 9 }, undefined, req);
  return { props: { comments } };
};

export default Comments;
