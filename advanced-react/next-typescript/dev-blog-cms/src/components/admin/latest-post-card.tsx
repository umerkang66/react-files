import Link from 'next/link';
import { type FC } from 'react';

import { useDeletePost } from '@/hooks/post-hooks';
import { trimText } from '@/lib/client-utils';

type Props = {
  id: string;
  title: string;
  meta: string;
  slug: string;
  onDeletePost: (id: string) => void;
};

const LatestPostCard: FC<Props> = ({ title, meta, slug, id, onDeletePost }) => {
  const { deletePost, deleting } = useDeletePost({ onMutate: onDeletePost });

  return (
    <div>
      <h1 className="text-lg font-semibold text-primary-dark transition dark:text-primary">
        {trimText(title, 50)}
      </h1>
      <p className="text-sm text-secondary-dark">{trimText(meta, 100)}</p>

      <div className="flex items-center justify-end space-x-3">
        <Link
          className="text-primary-dark transition hover:underline dark:text-primary"
          href={`/admin/posts/${slug}`}
        >
          Edit
        </Link>

        <button
          onClick={() => deletePost(id)}
          className="text-primary-dark transition hover:underline dark:text-primary"
        >
          {deleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>

      <hr className="h-[3px] border-none bg-secondary-dark" />
    </div>
  );
};

export { LatestPostCard };
