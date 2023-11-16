import { FC } from 'react';
import { BsHeart, BsHeartFill } from 'react-icons/bs';

type Props = {
  busy?: boolean;
  label?: string;
  liked?: boolean;
  onClick?: () => void;
};

const LikeHeart: FC<Props> = ({
  liked = false,
  label,
  onClick,
  busy = false,
}): JSX.Element => {
  return (
    <button
      disabled={busy}
      type="button"
      className="flex items-center space-x-2 text-primary-dark outline-none dark:text-primary"
      onClick={onClick}
    >
      <div className="w-5">
        {busy ? (
          <span className="inline-block -translate-y-[5px]">...</span>
        ) : (
          <>{liked ? <BsHeartFill color="#4790FD" /> : <BsHeart />}</>
        )}
      </div>
      <span>{label}</span>
    </button>
  );
};

export { LikeHeart };
