import { FC, ReactNode } from 'react';

import { Album, useFetchPhotosQuery, useCreatePhotoMutation } from '../store';

import Button from './button';
import Skeleton from './skeleton';
import PhotosListItem from './photos-list-item';

interface Props {
  album: Album;
}

const PhotosList: FC<Props> = ({ album }) => {
  const fetchPhotosResults = useFetchPhotosQuery(album);
  const [createPhoto, createPhotoResults] = useCreatePhotoMutation();

  let content: ReactNode | null;
  if (fetchPhotosResults.isFetching) {
    content = <Skeleton className="m-2 h-20 w-20" times={4} />;
  } else if (fetchPhotosResults.error) {
    content = <div>Error Fetching Photos</div>;
  } else {
    const { data } = fetchPhotosResults;
    content = data
      ? data.map(photo => <PhotosListItem key={photo.id} photo={photo} />)
      : [];
  }

  return (
    <div>
      <div className="m-2 flex flex-row items-center justify-between">
        <h3 className="text-lg font-bold">Photos in {album.title}</h3>

        <Button
          className="w-36 bg-gray-200"
          onClick={() => createPhoto(album)}
          loading={createPhotoResults.isLoading}
        >
          + Add Photo
        </Button>
      </div>
      <div className="mx-8 flex flex-row flex-wrap justify-center">
        {content}
      </div>
    </div>
  );
};

export default PhotosList;
