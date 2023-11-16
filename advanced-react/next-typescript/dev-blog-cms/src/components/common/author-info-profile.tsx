import { IAuthorInfo } from '@/types';
import Image from 'next/image';
import { type FC } from 'react';

type Props = { profile: IAuthorInfo };

const AuthorInfoProfile: FC<Props> = ({ profile }) => {
  const { name, avatar } = profile;
  const message = `This post is written by ${name}. ${
    name.split(' ')[0]
  } is a full stack javascript JavaScript developer.`;

  return (
    <div className="flex items-center rounded border-2 border-secondary-dark p-2">
      <div className="w-12">
        <div className="relative aspect-square">
          <Image className="rounded" src={avatar!} alt={name} layout="fill" />
        </div>
      </div>

      <div className="ml-2 flex-1">
        <h4 className="font-semibold text-primary-dark dark:text-primary">
          {name}
        </h4>
        <p className="text-primary-dark opacity-90 dark:text-primary">
          {message}
        </p>
      </div>
    </div>
  );
};

export { AuthorInfoProfile };
