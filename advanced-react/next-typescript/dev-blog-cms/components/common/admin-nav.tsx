import Link from 'next/link';
import { useEffect, useRef, useState, type FC } from 'react';
import { type IconType } from 'react-icons';
import { RiMenuFoldFill, RiMenuUnfoldFill } from 'react-icons/ri';

import Logo from './logo';

type Props = {
  navItems: {
    href: string;
    icon: IconType;
    label: string;
  }[];
};

const NAV_OPEN_WIDTH = 'w-60';
const NAV_CLOSE_WIDTH = 'w-12';
const NAV_VISIBILITY_KEY = 'nav-visibility';

const AdminNav: FC<Props> = ({ navItems }) => {
  const [showNav, setShowNav] = useState(true);

  useEffect(() => {
    const storedState = localStorage.getItem(NAV_VISIBILITY_KEY);

    if (storedState) setShowNav(JSON.parse(storedState));
  }, []);

  return (
    <nav
      className={`h-screen ${
        showNav ? NAV_OPEN_WIDTH : NAV_CLOSE_WIDTH
      } shadow-sm bg-secondary-light dark:bg-secondary-dark flex flex-col justify-between transition-width overflow-hidden sticky top-0`}
    >
      <div>
        <Link href="/admin" className="flex items-center space-x-2 p-3 mb-10">
          <Logo className="fill-highlight-light dark:fill-highlight-dark w-5 h-5" />

          {showNav && (
            <span className="text-highlight-light dark:text-highlight-dark text-xl font-semibold leading-none">
              Admin
            </span>
          )}
        </Link>

        <div>
          {navItems.map(({ href, icon, label }) => {
            const Icon = icon;
            return (
              <Link
                key={href}
                href={href}
                className="flex items-center text-highlight-light dark:text-highlight-dark text-xl p-3 hover:scale-[0.98] transition"
              >
                <Icon size={24} />
                {showNav && <span className="ml-2 leading-none">{label}</span>}
              </Link>
            );
          })}
        </div>
      </div>

      <button
        className={`text-highlight-light dark:text-highlight-dark p-3 hover:scale-[0.98] transition ${
          showNav && 'self-end'
        }`}
        onClick={() =>
          setShowNav(prevState => {
            const newState = !prevState;

            localStorage.setItem(NAV_VISIBILITY_KEY, JSON.stringify(newState));

            return newState;
          })
        }
      >
        {showNav ? (
          <RiMenuFoldFill size={25} />
        ) : (
          <RiMenuUnfoldFill size={25} />
        )}
      </button>
    </nav>
  );
};

export default AdminNav;
