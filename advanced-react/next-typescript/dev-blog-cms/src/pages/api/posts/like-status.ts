import { NextApiHandler } from 'next';

import { ICustomError } from '@/types';
import { catchAsync, getUser } from '@/lib/utils';
import { postUpdateLikeSchema, validateSchema } from '@/lib/validator';
import { CustomError } from '@/errors/custom-error';
import { Post } from '@/models';
import { connectToDb } from '@/lib/db';
import { NotFoundError } from '@/errors/not-found-error';

const handler: NextApiHandler = (req, res) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      return postLikeStatus(req, res);

    default:
      const error: ICustomError[] = [{ message: 'No Endpoint exists' }];
      return res.status(404).send({ error });
  }
};

const postLikeStatus = catchAsync(async (req, res) => {
  const { user } = await getUser(req, res);

  const data = await validateSchema(postUpdateLikeSchema, req.query);

  if (data instanceof CustomError) throw data;

  await connectToDb();

  const post = await Post.findById(data.postId);
  if (!post) throw new NotFoundError('Post not found');

  if (user) post.populateWithCurrentUserProps(user);

  res.status(201).send({
    likes: post.likes,
    likedByCurrentUser: post.likedByCurrentUser,
  });
});

export default handler;
