import { IComment } from '@libs/types';
import { FC } from 'react';

type Props = {
  data: IComment;
};

const CommentCard: FC<Props> = ({ data }) => {
  const classNames = data.clientOnly
    ? 'border card w-50 bg-dark'
    : 'card w-50 bg-dark';

  return (
    <div className={classNames}>
      <p className="card-body">{data.content}</p>
    </div>
  );
};

export default CommentCard;
