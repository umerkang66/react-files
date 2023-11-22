import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  Input,
  Button,
  Avatar,
  NavbarItem,
} from '@nextui-org/react';
import { auth } from '@/auth';
import Link from 'next/link';

async function Header() {
  const session = await auth();

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
        <NavbarItem>
          {session?.user ? <div>Signed In</div> : <div>Signed Out</div>}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export default Header;
