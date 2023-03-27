import Link from 'next/link';
import { FC, PropsWithChildren } from 'react';
import {
  AiOutlineDashboard,
  AiOutlineContainer,
  AiOutlineTeam,
  AiOutlineMail,
  AiOutlineContacts,
  AiOutlineFileAdd,
} from 'react-icons/ai';
import AdminNav from '../../components/common/admin-nav';

const navItems = [
  { href: '/admin', icon: AiOutlineDashboard, label: 'Dashboard' },
  { href: '/admin/posts', icon: AiOutlineContainer, label: 'Posts' },
  { href: '/admin/users', icon: AiOutlineTeam, label: 'Users' },
  { href: '/admin/comments', icon: AiOutlineMail, label: 'Comments' },
  { href: '/admin/contacts', icon: AiOutlineContacts, label: 'Contacts' },
];

const AdminLayout: FC<PropsWithChildren> = props => {
  return (
    <div className="flex">
      <AdminNav navItems={navItems} />
      <div className="flex-1 p-4">{props.children}</div>
      <Link
        href="/admin/post/create"
        className="bg-secondary-dark dark:bg-secondary-light text-primary dark:text-primary-dark fixed z-10 right-10 bottom-10 p-4 rounded-full hover:scale-90 shadow-sm transition"
      >
        <AiOutlineFileAdd size={28} />
      </Link>
    </div>
  );
};

export default AdminLayout;
