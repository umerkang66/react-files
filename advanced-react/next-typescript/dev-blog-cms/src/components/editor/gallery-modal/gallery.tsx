import { type FC } from 'react';
import { GalleryImage } from './gallery-image';
import { BsCardImage } from 'react-icons/bs';

type Props = {
  images: { src: string }[];
  onSelect?: (src: string) => void;
  uploading?: boolean;
  selectedImage?: string;
};

const Gallery: FC<Props> = ({
  images,
  uploading = false,
  selectedImage = '',
  onSelect,
}) => {
  return (
    <div className="flex flex-wrap">
      {uploading && (
        <div className="flex aspect-square basis-1/4 animate-pulse flex-col items-center justify-center rounded bg-secondary-light p-2 text-primary-dark">
          <BsCardImage size={60} />
          <p>Uploading</p>
        </div>
      )}

      {images.map(({ src }, i) => (
        <div className="basis-1/4 p-2" key={i}>
          <GalleryImage
            src={src}
            selected={selectedImage === src}
            onClick={() => onSelect && onSelect(src)}
            alt={`gallery ${i + 1}`}
          />
        </div>
      ))}
    </div>
  );
};

export { Gallery };
