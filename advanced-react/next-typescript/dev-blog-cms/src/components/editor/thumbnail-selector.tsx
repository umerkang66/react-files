import classNames from 'classnames';
import Image from 'next/image';
import { ChangeEventHandler, useState, type FC, useEffect } from 'react';

import { IImage } from '@/types';

type Props = {
  initialValue?: File | IImage;
  onChange?: (file: File) => void;
};

const ThumbnailSelector: FC<Props> = ({ initialValue, onChange }) => {
  // don't set the values, because this line also runs in the server.
  const [selectedThumbnail, setSelectedThumbnail] = useState('');

  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    const { files } = e.target;
    if (!files) return;

    const file = files[0];
    setSelectedThumbnail(URL.createObjectURL(file));

    onChange && onChange(file);
  };

  useEffect(() => {
    if (initialValue) {
      if (initialValue instanceof File)
        setSelectedThumbnail(URL.createObjectURL(initialValue));
      else setSelectedThumbnail(initialValue.url);
    }
  }, [initialValue]);

  return (
    <div className="w-32">
      <input
        hidden
        type="file"
        accept="image/*"
        id="thumbnail"
        onChange={handleChange}
      />
      <label htmlFor="thumbnail">
        {selectedThumbnail ? (
          <Image
            width={128}
            height={72}
            src={selectedThumbnail}
            alt="Thumbnail"
            className={classNames(commonClass, 'object-cover')}
          />
        ) : (
          <PosterUI label="Thumbnail" />
        )}
      </label>
    </div>
  );
};

const commonClass =
  'flex items-center justify-center border border-dashed border-secondary-dark dark:border-secondary-light rounded cursor-pointer aspect-video text-secondary-dark dark:text-secondary-light';

const PosterUI: FC<{ label: string; className?: string }> = props => {
  return (
    <div className={classNames(commonClass, props.className)}>
      <span>{props.label}</span>
    </div>
  );
};

export { ThumbnailSelector };
