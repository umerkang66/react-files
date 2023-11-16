import Image from 'next/image';
import { type FC } from 'react';
import { CheckMark } from '@/components/common/check-mark';

type Props = {
  src: string;
  selected?: boolean;
  onClick?: () => void;
  alt?: string;
};

const GalleryImage: FC<Props> = ({ src, selected, onClick, alt }) => {
  return (
    <div
      onClick={onClick}
      className="relative cursor-pointer overflow-hidden rounded"
    >
      <Image
        src={src}
        width={200}
        height={200}
        alt={alt || 'gallery'}
        className="aspect-square bg-secondary-light object-cover transition hover:scale-110"
      />

      <div className="absolute left-2 top-2">
        <CheckMark visible={selected || false} />
      </div>
    </div>
  );
};

export { GalleryImage };
