import { IComment, IPost } from '@/types';
import { connectToDb } from './db';
import { Comment, CommentDocument, Post, User } from '@/models';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';

export async function getPost(
  slug: string,
  select: string = '',
): Promise<IPost | null> {
  await connectToDb();
  const post = JSON.parse(
    JSON.stringify(
      await Post.findOne({ slug })
        .populate('author', 'name avatar')
        .select(select),
    ),
  ) as IPost | null;

  return post;
}

export async function getPosts(
  skipLimit: { page?: number; limit?: number; skip?: number },
  select: string = '',
): Promise<IPost[]> {
  await connectToDb();
  const { page, limit = 20, skip } = skipLimit;
  // if skip is absent, page will be available
  const finalSkip = skip ?? (page! - 1) * limit;

  const posts = await Post.find().select(select).skip(finalSkip).limit(limit);

  return JSON.parse(JSON.stringify(posts));
}

export async function getComments(
  skipLimit: { page?: number; limit?: number; skip?: number },
  select: string = '',
  req: GetServerSidePropsContext['req'],
): Promise<IComment[]> {
  const session = await getSession({ req });
  const user = session?.user;

  if (user?.role !== 'admin') {
    return [];
  }

  await connectToDb();
  const { page, limit = 20, skip } = skipLimit;
  // if skip is absent, page will be available
  const finalSkip = skip ?? (page! - 1) * limit;
  const userSelect = 'name email role avatar';

  const comments = await Comment.find({ chiefComment: true })
    .populate([
      { path: 'replies', populate: [{ path: 'owner', select: userSelect }] },
      { path: 'owner', select: userSelect },
      { path: 'belongsTo', select: 'title slug' },
    ])
    .select(select)
    .skip(finalSkip)
    .limit(limit);

  if (user) {
    comments.forEach(comment => {
      comment.populateWithCurrentUserProps(user);

      if (comment.replies.length) {
        comment.replies.forEach(reply => {
          reply = reply as CommentDocument;
          reply.populateWithCurrentUserProps(user);
        });
      }
    });
  }

  return JSON.parse(JSON.stringify(comments));
}
