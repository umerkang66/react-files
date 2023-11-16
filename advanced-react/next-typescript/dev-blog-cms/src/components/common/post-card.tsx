import Image from 'next/image';
import { type FC } from 'react';
import { IPost } from '@/types';
import dateFormat from 'dateformat';
import Link from 'next/link';
import { trimText } from '@/lib/client-utils';

type Props = {
  post: IPost;
  controls?: boolean;
  onDelete?: (id: string) => void;
};

const PostCard: FC<Props> = ({ post, controls = false, onDelete }) => {
  const { id, title, slug, meta, tags, thumbnail, createdAt } = post;

  return (
    <div className="flex h-full flex-col overflow-hidden rounded bg-primary shadow-sm shadow-secondary-dark transition dark:bg-primary-dark">
      {/* Image */}
      <div className="relative aspect-video">
        {thumbnail && thumbnail.url ? (
          <Image src={thumbnail.url} layout="fill" alt="Thumbnail" />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-semibold text-secondary-dark opacity-50">
            No Image
          </div>
        )}
      </div>

      {/* Post Info */}
      <div className="flex flex-1 flex-col p-2">
        <div className="flex items-center justify-between text-sm text-primary-dark dark:text-primary">
          <div className="flex items-center space-x-1">
            {tags.map((tag, i) => (
              <span key={tag + i}>#{tag}</span>
            ))}
          </div>
          <span>{dateFormat(createdAt, 'd-mmm-yyyy')}</span>
        </div>

        <Link href={`/${slug}`}>
          <h1 className="font-semibold text-primary-dark hover:underline dark:text-primary">
            {trimText(title, 50)}
          </h1>
        </Link>
        <p className="text-secondary-dark">{trimText(meta, 70)}</p>

        {controls && (
          <div className="mt-auto flex h-8 items-center justify-end space-x-4 text-primary-dark dark:text-primary">
            <>
              <Link href={`/admin/posts/${slug}`} className="hover:underline">
                Edit
              </Link>
              <button
                onClick={() => onDelete && onDelete(id)}
                className="hover:underline"
              >
                Delete
              </button>
            </>
          </div>
        )}
      </div>
    </div>
  );
};

export { PostCard };
