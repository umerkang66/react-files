import { useAppSelector } from '../hooks';
import CreateUser from './create-user';
import User from './user';

const UserList = () => {
  const users = useAppSelector(({ users: { data } }) => data);

  return (
    <section className="user-list">
      <CreateUser />
      {users.map((user) => (
        <User key={user.id} user={user} />
      ))}
    </section>
  );
};

export default UserList;
