import { useState, type FC, useEffect } from 'react';
import { CommentForm } from './comment-form';
import { GithubAuthButton } from './ui/button';
import { useUser } from '@/hooks/use-user';
import {
  useAddReply,
  useComments,
  useCreateComment,
} from '@/hooks/comment-hooks';
import { CommentCard } from './comment-card';
import classNames from 'classnames';

export type FinalComment = {
  content: string;
  belongsTo?: string;
};

type Props = { postId: string };

const Comments: FC<Props> = ({ postId }) => {
  const [showReplies, setShowReplies] = useState([] as string[]);
  const [whichCommentBusy, setWhichCommentBusy] = useState(
    null as null | string,
  );

  const { user } = useUser();
  const { comments, refetchComments, updateComments } = useComments(postId);

  const { createComment, creating } = useCreateComment({
    onMutate: comment => {
      // first optimistic update the comments
      updateComments(prev => ({
        comments: [{ ...comment!, new: true }, ...prev.comments],
      }));

      // then refetch the comments
      refetchComments();
    },
  });

  const { createReply } = useAddReply({
    onMutate: comment => {
      if (!comment) return;

      if (comment.repliedTo) {
        const repliedTo = comment.repliedTo;
        setShowReplies(prev => [...prev, repliedTo]);
      }

      updateComments(prev => {
        const newComments = [...prev.comments];
        const chiefComment = prev.comments.find(({ id }) => {
          return id === comment?.repliedTo;
        });
        if (!chiefComment) return prev;
        chiefComment.replies = [
          { ...comment, new: true },
          ...chiefComment.replies,
        ];
        return { comments: newComments };
      });

      refetchComments && refetchComments();
    },
  });

  const handleNewCommentSubmit = (content: string) => {
    if (!user || !user.id) return;
    const comment: FinalComment = { content, belongsTo: postId };

    createComment(comment);
  };

  // this will work for both replies and comments
  const onDeleteComment = (commentId: string, repliedTo?: string | null) => {
    if (!repliedTo) {
      return updateComments(prev => ({
        ...prev,
        comments: prev.comments.filter(c => c.id !== commentId),
      }));
    }

    updateComments(prev => {
      const newComments = [...prev.comments];
      const chiefComment = prev.comments.find(({ id }) => {
        return id === repliedTo;
      });
      if (!chiefComment) return prev;
      chiefComment.replies = chiefComment.replies.filter(
        r => r.id !== commentId,
      );
      return { comments: newComments };
    });
  };

  return (
    <div className="space-y-8 py-20">
      {user ? (
        <CommentForm
          onSubmit={handleNewCommentSubmit}
          busy={creating}
          title="Add comment"
        />
      ) : (
        <div className="flex flex-col items-end space-y-2">
          <h3 className="text-xl font-semibold text-secondary-dark">
            Log in to add your comment
          </h3>
          <GithubAuthButton />
        </div>
      )}

      {comments.length ? (
        <>
          {comments.map(comment => (
            <div
              className={classNames(
                'rounded border-[1px] border-secondary-dark p-4',
                comment.new ? 'bg-gray-300 dark:bg-neutral-700' : '',
              )}
              key={comment.id}
            >
              <CommentCard
                placeholder="Add your reply..."
                refetchComments={refetchComments}
                comment={comment}
                createReply={createReply}
                onDelete={onDeleteComment}
                showWhichReplies={id =>
                  setShowReplies(prev =>
                    !prev.includes(id)
                      ? [...prev, id]
                      : prev.filter(p => p !== id),
                  )
                }
                isRepliesShown={showReplies.includes(comment.id)}
                busy={whichCommentBusy === comment.id}
                whichCommentBusyOnReplying={id => setWhichCommentBusy(id)}
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
                            reply.new ? 'bg-gray-300 dark:bg-neutral-700' : '',
                          )}
                          key={reply.id}
                        >
                          <CommentCard
                            refetchComments={refetchComments}
                            comment={reply}
                            onDelete={onDeleteComment}
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
        </>
      ) : (
        <h3 className="mb-3 inline-block rounded bg-secondary-dark px-2 py-1 text-2xl font-semibold text-primary dark:bg-secondary-light dark:text-primary-dark">
          There are no comments to this post
        </h3>
      )}
    </div>
  );
};

export { Comments };
