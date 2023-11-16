import { IPost } from '@libs/types';
import { useRouter } from 'next/router';
import { FC } from 'react';

type Props = {
  data: IPost;
};

const PostCard: FC<Props> = ({ data }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/posts/${data.id}`);
  };

  const classNames = data.clientOnly
    ? 'border card w-50 bg-dark'
    : 'card w-50 bg-dark';

  return (
    <div className={classNames} onClick={handleClick}>
      <p className="card-header">{data.id}</p>
      <p className="card-body">{data.content}</p>
    </div>
  );
};

export default PostCard;
