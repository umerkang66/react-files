import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  Input,
} from '@nextui-org/react';
import Link from 'next/link';
import * as actions from '@/actions';
import HeaderAuth from './header-auth';

async function Header() {
  return (
    <Navbar className="shadow mb-6">
      <NavbarBrand>
        <Link className="font-bold" href="/">
          Discuss
        </Link>
      </NavbarBrand>

      <NavbarContent justify="center">
        <Input />
      </NavbarContent>

      <NavbarContent justify="end">
        <HeaderAuth />
      </NavbarContent>
    </Navbar>
  );
}

export default Header;
