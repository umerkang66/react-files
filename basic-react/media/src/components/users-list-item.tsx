import { FC, Fragment } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';

import { useThunk } from '../hooks';
import { deleteUser, User } from '../store';

import Button from './button';
import ExpandablePanel from './expandable-panel';
import AlbumsList from './albums-list';

interface Props {
  user: User;
}

const UsersListItem: FC<Props> = ({ user }) => {
  const [doDeleteUser, loading] = useThunk(deleteUser);

  const handleDeleteUser = (id: number) => {
    doDeleteUser(id);
  };

  const header = (
    <Fragment>
      <Button
        loading={loading}
        onClick={() => handleDeleteUser(user.id)}
        className="mr-2"
      >
        <AiOutlineDelete />
      </Button>
      {user.name}
    </Fragment>
  );

  return (
    <ExpandablePanel className="bg-gray-50" header={header}>
      <AlbumsList user={user} />
    </ExpandablePanel>
  );
};

export default UsersListItem;
