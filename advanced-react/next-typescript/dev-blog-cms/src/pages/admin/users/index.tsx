import { type NextPage } from 'next';
import { AdminLayout } from '@/components/layout/admin-layout';
import { LatestUsersTable } from '@/components/admin/latest-users-table';
import { usePaginatedUsers } from '@/hooks/user-hooks';
import { PaginationBtns } from '@/components/common/ui/button/pagination-btns';
import { useState } from 'react';

type Props = {};
const limit = 5;

const Users: NextPage<Props> = () => {
  const [page, setPage] = useState(1);
  const { users, loading } = usePaginatedUsers(page, limit);

  const onPrev = () => setPage(prev => (prev === 1 ? prev : prev - 1));
  const onNext = () =>
    setPage(prev => (users.length < limit ? prev : prev + 1));

  return (
    <AdminLayout>
      <h1 className="py-2 text-2xl font-semibold text-primary-dark transition dark:text-primary">
        All Users
      </h1>
      <LatestUsersTable users={users} />

      <div className="mt-4 flex w-full justify-end">
        <PaginationBtns
          disablePrev={page === 1}
          disableNext={users.length < limit}
          onPrev={onPrev}
          onNext={onNext}
          loading={loading}
        />
      </div>
    </AdminLayout>
  );
};

export default Users;
