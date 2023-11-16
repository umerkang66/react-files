import { PropsWithChildren, type FC, useState } from 'react';
import dateFormat from 'dateformat';
import parse from 'html-react-parser';
import {
  BsBoxArrowUpRight,
  BsFillReplyAllFill,
  BsFillTrashFill,
  BsPencilSquare,
} from 'react-icons/bs';

export type FinalReply = { content: string; repliedTo: string };

import { IComment } from '@/types';
import { ProfileIcon } from './ui/profile-icon';
import { CommentForm } from './comment-form';
import { useUser } from '@/hooks/use-user';
import {
  useDeleteComment,
  useEditComment,
  useLikeComment,
} from '@/hooks/comment-hooks';
import { LikeHeart } from './like-heart';
import Link from 'next/link';
import { trimText } from '@/lib/client-utils';

type Props = {
  comment: IComment;
  isRepliesShown?: boolean;
  placeholder?: string;
  refetchComments?: () => void;
  createReply?: (reply: FinalReply) => Promise<any>;
  onDelete: (commentId: string, repliedTo?: string | null) => void;
  showWhichReplies?: (commentId: string) => void;
  busy?: boolean;
  whichCommentBusyOnReplying?: (commentId: string | null) => void;
};

const CommentCard: FC<Props> = ({
  comment,
  placeholder,
  refetchComments,
  createReply,
  onDelete,
  showWhichReplies,
  whichCommentBusyOnReplying,
  busy,
  isRepliesShown,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [formBtnTitle, setFormBtnTitle] = useState('Submit');

  const [initialState, setInitialState] = useState('');
  const [content, setContent] = useState(comment.content);
  const [likes, setLikes] = useState(comment.likes);
  const [likedByCurrentUser, setLikedByCurrentUser] = useState(
    comment.likedByCurrentUser,
  );

  const { user } = useUser();
  const isAdmin = user?.role === 'admin';

  const { updateComment, updating } = useEditComment({
    commentId: comment.id,
    onMutate: comment => {
      setContent(comment!.content);
      refetchComments && refetchComments();
      hideForm();
    },
  });

  const { deleteComment, deleting } = useDeleteComment({
    onMutate: commentId => {
      onDelete(commentId, comment.repliedTo);
      refetchComments && refetchComments();
    },
  });

  const { updateLike, liking } = useLikeComment({
    onMutate: data => {
      setLikes(data.likes);
      setLikedByCurrentUser(data.likedByCurrentUser);
      refetchComments && refetchComments();
    },
  });

  const displayForm = () => setShowForm(true);
  const hideForm = () => {
    setShowForm(false);
    // Reset to default
    setFormBtnTitle('Submit');
  };

  const handleOnReplyClick = () => {
    setFormBtnTitle('Add Reply');
    // resetting to default
    setInitialState('');
    displayForm();
  };

  const handleOnEditClick = () => {
    setFormBtnTitle('Edit');
    setInitialState(content);
    displayForm();
  };

  const handleOnSubmit = async (content: string) => {
    if (!initialState) {
      // handle reply
      whichCommentBusyOnReplying && whichCommentBusyOnReplying(comment.id);

      const reply: FinalReply = { content, repliedTo: comment.id };

      await (createReply && createReply(reply));

      whichCommentBusyOnReplying && whichCommentBusyOnReplying(null);

      return hideForm();
    }
    // handle edit
    updateComment(content);
  };

  const onLikeClick = () => {
    if (!user || !user.id) return;
    updateLike(comment.id);
  };

  return (
    <div className="flex items-start space-x-3">
      <ProfileIcon
        nameInitial={
          comment.owner.avatar ? undefined : comment.owner.name[0].toUpperCase()
        }
        avatar={comment.owner.avatar}
      />

      <div className="flex-1">
        <h1 className="text-lg font-semibold text-primary-dark dark:text-primary">
          {comment.owner.name}
          <span className="text-secondary-dark">
            {isAdmin && ` - ${comment.owner.email}`}{' '}
            {comment.owner.role === 'admin' && (
              <span className="rounded bg-primary-dark px-1 text-primary dark:bg-primary dark:text-primary-dark">
                Admin
              </span>
            )}
          </span>
        </h1>

        {comment.belongsTo !== null &&
          typeof comment.belongsTo !== 'string' && (
            <div className="flex items-center font-semibold text-primary-dark transition dark:text-primary">
              <span className="text-sm text-secondary-dark">
                commented on -
              </span>

              <Link
                className="ml-2 flex items-center space-x-2 text-secondary-dark dark:text-primary"
                href={`/${comment.belongsTo.slug}`}
                target="_blank"
              >
                <BsBoxArrowUpRight size={12} />
                <p className="inline-block">
                  {trimText(comment.belongsTo.title, 30)}
                </p>
              </Link>
            </div>
          )}

        <span className="text-sm text-secondary-dark">
          {dateFormat(comment.createdAt, 'd-mmm-yyyy')}
        </span>
        <div className="prose dark:prose-invert">{parse(content)}</div>

        <div className="flex items-center space-x-4">
          <LikeHeart
            liked={likedByCurrentUser}
            label={likes.length + ' likes'}
            onClick={onLikeClick}
            busy={liking}
          />
          {comment.chiefComment && (
            <CCButton
              onClick={() => showWhichReplies && showWhichReplies(comment.id)}
            >
              <span className="underline">
                {isRepliesShown ? 'Hide' : 'Show'} Replies
              </span>
            </CCButton>
          )}

          {!!user && !!createReply && comment.chiefComment && (
            <CCButton onClick={handleOnReplyClick}>
              <BsFillReplyAllFill />
              <span>Reply</span>
            </CCButton>
          )}

          {comment.ownedByCurrentUser && (
            <>
              <CCButton onClick={handleOnEditClick}>
                <BsPencilSquare />
                <span>Edit</span>
              </CCButton>

              <CCButton
                busy={deleting}
                onClick={() => deleteComment(comment.id)}
              >
                <BsFillTrashFill />
                <span>{deleting ? 'Deleting...' : 'Delete'}</span>
              </CCButton>
            </>
          )}
        </div>

        {showForm && (
          <div className="mt-3">
            <CommentForm
              btnTitle={formBtnTitle}
              onClose={hideForm}
              onSubmit={handleOnSubmit}
              initialState={initialState}
              busy={busy || updating}
              placeholder={placeholder}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const CCButton: FC<
  PropsWithChildren<{ onClick?: () => void; busy?: boolean }>
> = ({ children, onClick, busy = false }) => {
  return (
    <button
      disabled={busy}
      onClick={onClick}
      className="flex items-center space-x-2 text-primary-dark dark:text-primary"
    >
      {children}
    </button>
  );
};

export { CommentCard };
