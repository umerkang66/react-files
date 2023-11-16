import { NextPage } from 'next';

import { AdminLayout } from '@/components/layout/admin-layout';
import { ContentWrapper } from '@/components/admin/content-wrapper';
import { LatestPosts } from '@/components/admin/latest-posts';
import { LatestComments } from '@/components/admin/latest-comments';
import { LatestUsersTable } from '@/components/admin/latest-users-table';
import { useUsers } from '@/hooks/user-hooks';

const Admin: NextPage = () => {
  const { users } = useUsers(8);

  return (
    <AdminLayout>
      <div className="flex space-x-10">
        <ContentWrapper seeAllRoutes="/admin/posts" title="Latest Posts">
          <LatestPosts />
        </ContentWrapper>

        <ContentWrapper seeAllRoutes="/admin/comments" title="Latest Comments">
          <LatestComments />
        </ContentWrapper>
      </div>

      <div className="max-w-[500px]">
        <ContentWrapper seeAllRoutes="/admin/users" title="Latest Users">
          <LatestUsersTable users={users} />
        </ContentWrapper>
      </div>
    </AdminLayout>
  );
};

export default Admin;
