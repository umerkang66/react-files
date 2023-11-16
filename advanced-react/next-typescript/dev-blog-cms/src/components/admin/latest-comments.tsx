import { type FC } from 'react';
import { useComments } from '@/hooks/comment-hooks';
import { All } from '@/types';
import { LatestCommentCard } from './latest-comment-card';

type Props = {};

const LatestComments: FC<Props> = props => {
  const { comments } = useComments('*' as All, 8);

  return comments.map(comment => (
    <LatestCommentCard comment={comment} key={comment.id} />
  ));
};

export { LatestComments };
