import { Navbar, NavbarBrand, NavbarContent } from '@nextui-org/react';
import { Suspense } from 'react';
import Link from 'next/link';

import HeaderAuth from './header-auth';
import SearchInput from './search-input';

async function Header() {
  return (
    <Navbar className="shadow mb-6">
      <NavbarBrand>
        <Link className="font-bold" href="/">
          Discuss
        </Link>
      </NavbarBrand>

      <NavbarContent justify="center">
        <Suspense>
          <SearchInput />
        </Suspense>
      </NavbarContent>

      <NavbarContent justify="end">
        <HeaderAuth />
      </NavbarContent>
    </Navbar>
  );
}

export default Header;
