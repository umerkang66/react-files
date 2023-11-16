import { IComment } from '@libs/types';
import { FC } from 'react';

type Props = {
  data: IComment;
};

const CommentCard: FC<Props> = ({ data }) => {
  return (
    <div className=" card w-50 bg-dark">
      <p className="card-body">{data.content}</p>
    </div>
  );
};

export default CommentCard;
