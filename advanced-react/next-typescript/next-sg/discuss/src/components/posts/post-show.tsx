import { db } from '@/db';
import { notFound } from 'next/navigation';

interface Props {
  postId: string;
}

async function PostShow({ postId }: Props) {
  const post = await db.post.findFirst({
    where: { id: postId },
  });

  if (!post) {
    return notFound();
  }

  return (
    <div className="m-4">
      <h1 className="text-2xl font-bold my-2">{post.title}</h1>
      <p className="p-4 border rounded">{post.content}</p>
    </div>
  );
}

export default PostShow;
