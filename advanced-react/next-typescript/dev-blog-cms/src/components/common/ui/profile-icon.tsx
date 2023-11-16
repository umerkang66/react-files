import { IUser } from '@/types';
import classNames from 'classnames';
import Image from 'next/image';
import { useCallback, type FC } from 'react';

type Props = {
  lightOnly?: boolean;
  avatar?: string;
  nameInitial?: string;
  email?: string;
  user?: IUser;
};

const ProfileIcon: FC<Props> = ({ lightOnly, avatar, nameInitial }) => {
  const getColors = useCallback(() => {
    return lightOnly
      ? 'text-primary-dark bg-primary'
      : 'bg-primary-dark text-primary dark:bg-primary dark:text-primary-dark';
  }, [lightOnly]);

  return (
    <div
      className={classNames(
        'relative flex h-8 w-8 select-none items-center justify-center overflow-hidden rounded-full',
        getColors(),
      )}
    >
      {avatar ? (
        <Image src={avatar} layout="fill" alt="Profile" />
      ) : (
        nameInitial
      )}
    </div>
  );
};

export { ProfileIcon };
