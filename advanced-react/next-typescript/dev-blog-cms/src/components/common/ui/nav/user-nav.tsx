import Link from 'next/link';
import { type FC } from 'react';
import { HiLightBulb } from 'react-icons/hi';

import { Logo } from '../logo';
import { APP_NAME } from '../../app-head';
import { GithubAuthButton } from '../button';
import { ProfileHead } from '../profile-head';
import { Dropdown, type DropdownOption } from '../dropdown';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useDarkMode } from '@/hooks/use-dark-mode';

type Props = {};

const defaultOptions: DropdownOption[] = [
  { label: 'Logout', onClick: signOut },
];

const UserNav: FC<Props> = props => {
  const { data: session, status } = useSession();
  const user = session?.user;
  const isAdmin = user?.role === 'admin';

  const router = useRouter();
  const { toggleTheme } = useDarkMode();

  const dropdownOptions: DropdownOption[] = isAdmin
    ? [
        { label: 'Dashboard', onClick: () => router.push('/admin') },
        ...defaultOptions,
      ]
    : defaultOptions;

  return (
    <div className="flex items-center justify-between bg-primary-dark p-3">
      {/* Logo */}
      <Link
        className="flex items-center space-x-2 text-highlight-dark"
        href="/"
      >
        <Logo className="h-5 w-5 fill-highlight-dark md:h-8 md:w-8" />
        <span className="font-semibold md:text-xl">{APP_NAME}</span>
      </Link>

      <div className="flex items-center space-x-5">
        <button
          onClick={toggleTheme}
          className="text-secondary-light dark:text-secondary-dark"
        >
          <HiLightBulb size={34} />
        </button>

        {status !== 'loading' && (
          <>
            {status === 'authenticated' ? (
              <Dropdown
                options={dropdownOptions}
                head={
                  <ProfileHead
                    lightOnly
                    avatar={user?.avatar}
                    nameInitial={user?.avatar ?? user?.name![0]}
                  />
                }
              />
            ) : (
              <GithubAuthButton lightOnly />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export { UserNav };
