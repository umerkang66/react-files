import { IUser } from '@/types';
import { type FC } from 'react';
import { ProfileIcon } from '../common/ui/profile-icon';

type Props = { users: IUser[] };

const LatestUsersTable: FC<Props> = ({ users }) => {
  return (
    <div>
      <table className="w-full text-left text-primary-dark dark:text-primary">
        <thead>
          <tr className="bg-secondary-dark text-left text-primary">
            <th className="p-2">Profile</th>
            <th className="p-2">Email</th>
            <th className="p-2">Provider</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr
              className="border-b-2 border-secondary-dark"
              key={user.id as string}
            >
              <td className="py-2">
                <div className="flex items-center space-x-2">
                  <ProfileIcon
                    avatar={user.avatar}
                    nameInitial={user.name[0].toUpperCase()}
                  />
                  <p>{user.name}</p>
                </div>
              </td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.provider}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { LatestUsersTable };
