import { ReactNode, type FC, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { IComment } from '@/types';
import { CommentCard } from './comment-card';
import classNames from 'classnames';

type Props = {
  updateTotalComments: (fn: (prevComments: IComment[]) => IComment[]) => void;
  comments: IComment[];
  hasMore: boolean;
  next: () => void;
  dataLength: number;
  loader?: ReactNode;
  onDelete?: (commentId: string) => void;
};

// Comment Card will automatically
const InfiniteScrollComments: FC<Props> = ({
  comments,
  dataLength,
  hasMore,
  next,
  loader,
  updateTotalComments,
}) => {
  const [showReplies, setShowReplies] = useState([] as string[]);

  const defaultLoader = (
    <p className="animate-pulse p-3 text-center text-xl font-semibold text-secondary-dark opacity-50">
      Loading...
    </p>
  );

  const onDeleteHandler = (commentId: string, repliedTo?: string | null) => {
    if (!repliedTo) {
      return updateTotalComments(prev =>
        prev.filter(comment => comment.id !== commentId),
      );
    }

    updateTotalComments(prev => {
      const newComments = [...prev];
      const chiefComment = newComments.find(com => com.id === repliedTo);
      if (!chiefComment) return newComments;

      chiefComment.replies = chiefComment.replies.filter(
        com => com.id !== commentId,
      );

      return newComments;
    });
  };

  return (
    <>
      <InfiniteScroll
        hasMore={hasMore}
        next={next}
        dataLength={dataLength}
        loader={loader || defaultLoader}
      >
        <div className="mx-auto max-w-4xl space-y-8 p-3">
          <h1 className="py-4 text-2xl font-semibold text-primary-dark underline dark:text-primary">
            All Comments
          </h1>
          {comments.map(comment => (
            <div
              className={classNames(
                'rounded border-[1px] border-secondary-dark p-4',
              )}
              key={comment.id}
            >
              <CommentCard
                onDelete={onDeleteHandler}
                key={comment.id}
                comment={comment}
                showWhichReplies={id =>
                  setShowReplies(prev =>
                    !prev.includes(id)
                      ? [...prev, id]
                      : prev.filter(p => p !== id),
                  )
                }
              />

              {showReplies.includes(comment.id) && (
                <div className="ml-auto mt-3 w-[95%] space-y-3">
                  {comment.replies.length ? (
                    <>
                      <h3 className="mb-3 font-semibold text-secondary-dark underline dark:text-secondary-light">
                        Replies
                      </h3>
                      {comment.replies.map(reply => (
                        <div
                          className={classNames(
                            'rounded border-[1px] border-secondary-dark p-4',
                          )}
                          key={reply.id}
                        >
                          <CommentCard
                            comment={reply}
                            onDelete={onDeleteHandler}
                          />
                        </div>
                      ))}
                    </>
                  ) : (
                    <h3 className="mb-3 inline-block rounded bg-secondary-dark px-2 py-1 font-semibold text-secondary-light dark:bg-secondary-light dark:only:text-secondary-dark">
                      There are no replies to this comment.
                    </h3>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
};

export { InfiniteScrollComments };
