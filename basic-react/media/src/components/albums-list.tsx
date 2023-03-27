import { FC, ReactNode } from 'react';
import {
  type User,
  useFetchAlbumsQuery,
  useCreateAlbumMutation,
} from '../store';

import Skeleton from './skeleton';
import Button from './button';
import AlbumsListItem from './albums-list-item';

interface Props {
  user: User;
}

const AlbumsList: FC<Props> = ({ user }) => {
  // "isLoading" runs only on the first time, but "isFetching" runs on every "reFetch"
  // This query will run again, using the tag system
  const fetchAlbumsResults = useFetchAlbumsQuery(user);

  const [addAlbum, addAlbumResults] = useCreateAlbumMutation();

  let content: ReactNode | null;
  if (fetchAlbumsResults.isFetching) {
    content = <Skeleton className="h-10 w-full" times={3} />;
  } else if (fetchAlbumsResults.error) {
    content = <div>Error Loading Albums</div>;
  } else {
    const { data } = fetchAlbumsResults;

    content = data
      ? data.map(album => <AlbumsListItem key={album.id} album={album} />)
      : null;
  }

  return (
    <div className="pt-1 pb-4 px-6">
      <div className="mb-2 flex flex-row items-center justify-between">
        <h3 className="text-lg font-bold">Albums for {user.name}</h3>
        <Button
          // when isFetching is true (not for the first time) or addAlbumsResults.isLoading is true, keep the button loading
          className="w-32 bg-gray-100"
          loading={addAlbumResults.isLoading}
          onClick={() => addAlbum(user)}
        >
          + Add Album
        </Button>
      </div>
      <div>{content}</div>
    </div>
  );
};

export default AlbumsList;
