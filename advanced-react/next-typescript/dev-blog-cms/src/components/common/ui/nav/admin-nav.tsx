import Link from 'next/link';
import { useEffect, useState, type FC } from 'react';
import { type IconType } from 'react-icons';
import { RiMenuFoldFill, RiMenuUnfoldFill } from 'react-icons/ri';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import { Logo } from '../logo';

type Props = { navItems: { href: string; icon: IconType; label: string }[] };

const NAV_OPEN_WIDTH = 'w-60';
const NAV_CLOSE_WIDTH = 'w-12';
const NAV_VISIBILITY_KEY = 'nav-visibility';

const AdminNav: FC<Props> = ({ navItems }) => {
  const [showFullNav, setShowFullNav] = useState(true);

  useEffect(() => {
    const storedState = localStorage.getItem(NAV_VISIBILITY_KEY);

    if (storedState) setShowFullNav(JSON.parse(storedState));
  }, []);

  const renderNavItems = () => {
    return navItems.map(({ href, icon, label }) => {
      const Icon = icon;
      return (
        <Tippy key={href} content={label}>
          <Link
            href={href}
            className="flex items-center p-3 text-xl text-highlight-light transition hover:scale-[0.98] dark:text-highlight-dark"
          >
            <Icon size={24} />
            {showFullNav && <span className="ml-2 leading-none">{label}</span>}
          </Link>
        </Tippy>
      );
    });
  };

  const toggleFullNav = () => {
    setShowFullNav(prevState => {
      const newState = !prevState;

      localStorage.setItem(NAV_VISIBILITY_KEY, JSON.stringify(newState));

      return newState;
    });
  };

  return (
    <nav
      className={`h-screen ${
        showFullNav ? NAV_OPEN_WIDTH : NAV_CLOSE_WIDTH
      } sticky top-0 flex flex-col justify-between overflow-hidden bg-secondary-light shadow-sm transition-width dark:bg-secondary-dark`}
    >
      <div>
        <Link href="/admin" className="mb-10 flex items-center space-x-2 p-3">
          <Logo className="h-5 w-5 fill-highlight-light dark:fill-highlight-dark" />

          {showFullNav && (
            <span className="text-xl font-semibold leading-none text-highlight-light dark:text-highlight-dark">
              Admin
            </span>
          )}
        </Link>

        <div>{renderNavItems()}</div>
      </div>

      <button
        className={`p-3 text-highlight-light transition hover:scale-[0.98] dark:text-highlight-dark ${
          showFullNav && 'self-end'
        }`}
        onClick={toggleFullNav}
      >
        {showFullNav ? (
          <RiMenuFoldFill size={25} />
        ) : (
          <RiMenuUnfoldFill size={25} />
        )}
      </button>
    </nav>
  );
};

export { AdminNav };
