import Link from 'next/link';
import { FC, PropsWithChildren } from 'react';
import {
  AiOutlineDashboard,
  AiOutlineContainer,
  AiOutlineTeam,
  AiOutlineMail,
  AiOutlineFileAdd,
} from 'react-icons/ai';
import { AdminNav } from '../common/ui/nav/admin-nav';
import { AppHead } from '../common/app-head';
import { AdminSecondaryNav } from '../common/ui/nav/admin-secondary-nav';

const navItems = [
  { href: '/admin', icon: AiOutlineDashboard, label: 'Dashboard' },
  { href: '/admin/posts', icon: AiOutlineContainer, label: 'Posts' },
  { href: '/admin/users', icon: AiOutlineTeam, label: 'Users' },
  { href: '/admin/comments', icon: AiOutlineMail, label: 'Comments' },
];

const AdminLayout: FC<PropsWithChildren & { title?: string }> = ({
  title,
  children,
}) => {
  return (
    <>
      <AppHead title={title} />
      <div className="flex">
        <AdminNav navItems={navItems} />
        <div className="flex-1 bg-primary p-4 dark:bg-primary-dark">
          <AdminSecondaryNav />
          {children}
        </div>
        <Link
          href="/admin/posts/create"
          className="fixed bottom-10 right-10 z-10 rounded-full bg-secondary-dark p-4 text-primary shadow-sm transition hover:scale-90 dark:bg-secondary-light dark:text-primary-dark"
        >
          <AiOutlineFileAdd size={28} />
        </Link>
      </div>
    </>
  );
};

export { AdminLayout };
