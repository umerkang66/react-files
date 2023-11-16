import { type FC } from 'react';
import { BsBoxArrowUpRight } from 'react-icons/bs';
import parse from 'html-react-parser';

import { ProfileIcon } from '../common/ui/profile-icon';
import Link from 'next/link';
import { trimText } from '@/lib/client-utils';
import { IComment } from '@/types';

type Props = { comment: IComment };

const LatestCommentCard: FC<Props> = ({ comment }) => {
  comment.belongsTo = comment.belongsTo as { title: string; slug: string };

  return (
    <div className="flex space-x-2 border-b-2 border-secondary-dark">
      <ProfileIcon
        avatar={comment.owner.avatar}
        nameInitial={comment.owner.name[0].toUpperCase()}
      />

      <div className="flex-1">
        <div className="font-semibold text-primary-dark transition dark:text-primary">
          {comment.owner.name + ' '}
          <span className="text-sm text-secondary-dark">commented on</span>
        </div>

        <Link href={`/${comment.belongsTo.slug}`} target="_blank">
          <div className="flex items-center space-x-2 text-secondary-dark dark:text-primary">
            <BsBoxArrowUpRight size={12} />
            <p className="inline-block">
              {trimText(comment.belongsTo.title, 30)}
            </p>
          </div>
        </Link>

        <div className="prose dark:prose-invert">{parse(comment.content)}</div>
      </div>
    </div>
  );
};

export { LatestCommentCard };
