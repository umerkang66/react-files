import { ReactNode, type FC, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { PostCard } from './post-card';
import { IPost } from '@/types';
import { useDeletePost } from '@/hooks/post-hooks';
import { ConfirmModal } from './ui/confirm-modal';

type Props = {
  posts: IPost[];
  showControls?: boolean;
  hasMore: boolean;
  next: () => void;
  dataLength: number;
  loader?: ReactNode;
  deletedPostId?: (id: string) => void;
};

const InfiniteScrollPosts: FC<Props> = ({
  posts,
  showControls = false,
  dataLength,
  hasMore,
  next,
  loader,
  deletedPostId,
}) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null as string | null);

  const defaultLoader = (
    <p className="animate-pulse p-3 text-center text-xl font-semibold text-secondary-dark opacity-50">
      Loading...
    </p>
  );

  const { deletePost, deleting } = useDeletePost();

  const deleteHandler = async () => {
    if (deleteId) {
      await deletePost(deleteId);
      setShowConfirmModal(false);
      deletedPostId && deletedPostId(deleteId);
      setDeleteId(null);
    }
  };

  const onDeleteClick = (id: string) => {
    setDeleteId(id);
    setShowConfirmModal(true);
  };

  return (
    <>
      <InfiniteScroll
        hasMore={hasMore}
        next={next}
        dataLength={dataLength}
        loader={loader || defaultLoader}
      >
        <div className="mx-auto max-w-4xl p-3">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {posts.map(post => (
              <PostCard
                onDelete={onDeleteClick}
                controls={showControls}
                key={post.id}
                post={post}
              />
            ))}
          </div>
        </div>
      </InfiniteScroll>
      <ConfirmModal
        title="Delete the Post"
        subTitle="Are you sure you want to delete the post?"
        danger
        visible={showConfirmModal}
        onCancel={() => setShowConfirmModal(false)}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={deleteHandler}
        busy={deleting}
      />
    </>
  );
};

export { InfiniteScrollPosts };
