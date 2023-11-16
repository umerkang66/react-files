import type { NextPage } from 'next';
import { Editor } from '@/components/editor';
import { AdminLayout } from '@/components/layout/admin-layout';
import { useCreatePost } from '@/hooks/post-hooks';

type Props = {};

const Create: NextPage<Props> = () => {
  const { createPost, creating } = useCreatePost();

  return (
    <AdminLayout title="New Post">
      <div className="mx-auto max-w-4xl">
        <Editor btnTitle="Create" busy={creating} onSubmit={createPost} />
      </div>
    </AdminLayout>
  );
};

export default Create;
