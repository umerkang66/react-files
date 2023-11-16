import { type FC } from 'react';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';

import { Dropdown, DropdownOption } from '../dropdown';
import { ProfileHead } from '../profile-head';
import { useDarkMode } from '@/hooks/use-dark-mode';
import { SearchBar } from '../../search-bar';
import { useUser } from '@/hooks/use-user';

type Props = {};

const AdminSecondaryNav: FC<Props> = props => {
  const router = useRouter();
  const { toggleTheme } = useDarkMode();
  const { user } = useUser();

  const navigateToCreateNewPost = () => router.push('/admin/posts/create');

  const options: DropdownOption[] = [
    { label: 'Add new post', onClick: navigateToCreateNewPost },
    { label: 'Change theme', onClick: toggleTheme },
    { label: 'Signout', onClick: signOut },
  ];

  const handleSearchSubmit = (query: string) => {
    router.push(`/admin/search?query=${query}`);
  };

  return (
    <div className="flex items-center justify-between">
      {/* search bar */}
      <SearchBar onSubmit={handleSearchSubmit} />

      {/* options /profile head */}
      <Dropdown
        head={<ProfileHead nameInitial={user?.name[0]} avatar={user?.avatar} />}
        options={options}
      />
    </div>
  );
};

export { AdminSecondaryNav };
