import { FC, useEffect } from 'react';

import { fetchUsers, addUser } from '../store';
import { useAppSelector, useThunk } from '../hooks';
import UsersListItem from './users-list-item';

import Skeleton from './skeleton';
import Button from './button';

const UsersList: FC = () => {
  const [doFetchUsers, isFetchingUser, fetchingUserError] =
    useThunk(fetchUsers);
  const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUser);
  const { data: users } = useAppSelector(state => state.users);

  const handleCreateUser = () => {
    doCreateUser();
  };

  useEffect(() => {
    doFetchUsers();
  }, [doFetchUsers]);

  const renderedUser = users.map(user => {
    return <UsersListItem key={user.id} user={user} />;
  });

  return (
    <div>
      <div className="flex flex-row justify-between items-center m-3">
        <h1 className="m-2 text-xl">Users</h1>

        <Button
          className="w-28 bg-gray-50"
          loading={isCreatingUser}
          onClick={handleCreateUser}
        >
          + Add User
        </Button>

        {!isCreatingUser && creatingUserError && (
          <div>{creatingUserError.message}</div>
        )}
      </div>

      {isFetchingUser && <Skeleton className="h-10 w-full" times={6} />}
      {!isFetchingUser && fetchingUserError && (
        <div>{fetchingUserError.message}</div>
      )}

      {!isFetchingUser && !fetchingUserError && <div>{renderedUser}</div>}
    </div>
  );
};

export default UsersList;
