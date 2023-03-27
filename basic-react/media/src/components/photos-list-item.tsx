import { FC } from 'react';
import { GoTrashcan } from 'react-icons/go';
import { ImSpinner8 } from 'react-icons/im';

import { Photo, useRemovePhotoMutation } from '../store';

interface Props {
  photo: Photo;
}

const PhotosListItem: FC<Props> = ({ photo }) => {
  const [removePhoto, results] = useRemovePhotoMutation();

  const handleRemovePhoto = () => {
    removePhoto(photo);
  };

  return (
    <div onClick={handleRemovePhoto} className="relative m-2">
      <img className="h-20 w-20" src={photo.url} alt={photo.id.toString()} />
      <button
        disabled={results.isLoading}
        className="absolute inset-0 flex items-center justify-center hover:bg-gray-200 opacity-0 hover:opacity-80"
      >
        {results.isLoading ? (
          <ImSpinner8 className="text-3xl animate-spin" />
        ) : (
          <GoTrashcan className="text-3xl cursor-pointer" />
        )}
      </button>
    </div>
  );
};

export default PhotosListItem;
