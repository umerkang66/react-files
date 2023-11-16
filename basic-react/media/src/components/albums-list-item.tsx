import { FC, Fragment } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';

import Button from './button';
import ExpandablePanel from './expandable-panel';
import PhotosList from './photos-list';

import { Album, useRemoveAlbumMutation } from '../store';

interface Props {
  album: Album;
}

const AlbumsListItem: FC<Props> = ({ album }) => {
  const [removeAlbum, results] = useRemoveAlbumMutation();

  const header = (
    <Fragment>
      <Button
        loading={results.isLoading}
        onClick={() => removeAlbum(album)}
        className="mr-2"
      >
        <AiOutlineDelete />
      </Button>
      {album.title}
    </Fragment>
  );

  return (
    <ExpandablePanel className="bg-gray-100" key={album.id} header={header}>
      <PhotosList album={album} />
    </ExpandablePanel>
  );
};

export default AlbumsListItem;
