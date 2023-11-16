import classNames from 'classnames';
import Image from 'next/image';
import { useCallback, type FC } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import { ProfileIcon } from './profile-icon';

type Props = {
  lightOnly?: boolean;
  avatar?: string;
  nameInitial?: string;
};

const ProfileHead: FC<Props> = props => {
  return (
    <div className="flex items-center">
      {/* image / name initial */}
      <ProfileIcon {...props} />

      {/* down icon */}
      <AiFillCaretDown
        className={
          props.lightOnly
            ? 'text-primary'
            : 'text-primary-dark dark:text-primary'
        }
      />
    </div>
  );
};

export { ProfileHead };
