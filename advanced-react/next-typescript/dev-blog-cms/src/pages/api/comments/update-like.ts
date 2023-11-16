import { NextApiHandler } from 'next';

import { ICustomError } from '@/types';
import { catchAsync, requireUser } from '@/lib/utils';
import { commentUpdateLikeSchema, validateSchema } from '@/lib/validator';
import { CustomError } from '@/errors/custom-error';
import { Comment } from '@/models';
import { connectToDb } from '@/lib/db';
import { NotFoundError } from '@/errors/not-found-error';

const handler: NextApiHandler = (req, res) => {
  const { method } = req;

  switch (method) {
    case 'POST':
      return updateCommentLike(req, res);

    default:
      const error: ICustomError[] = [{ message: 'No Endpoint exists' }];
      return res.status(404).send({ error });
  }
};

const updateCommentLike = catchAsync(async (req, res) => {
  const { user } = await requireUser(req, res);

  const data = await validateSchema(commentUpdateLikeSchema, req.body);

  if (data instanceof CustomError) throw data;

  await connectToDb();

  // UNLIKE: User already liked this
  const comWithULike = await Comment.findOneAndUpdate(
    { _id: data.commentId, likes: { $in: [user.id] } },
    // $in is for multiple items, if we want to add single item, just do like this 'likes: user.id'
    // but (this syntax can also be used for single items)
    { $pull: { likes: { $in: [user.id] } } },
    { runValidators: true, new: true },
  );

  comWithULike?.populateWithCurrentUserProps(user);

  if (comWithULike) {
    return res.status(200).send({
      likes: comWithULike.likes,
      likedByCurrentUser: comWithULike.likedByCurrentUser,
      message: 'User like removed',
    });
  }

  // LIKE THIS: If user hasn't liked it
  const comWithoutULike = await Comment.findOneAndUpdate(
    { _id: data.commentId, likes: { $not: { $in: [user.id] } } },
    // for push, we can use $in, but we have to use $each, this is for multiple items
    // if we want to add one item, don't use the $each operator, just use like 'likes: user.id'
    // but (this syntax can also be used for single items)
    { $push: { likes: { $each: [user.id] } } },
    { runValidators: true, new: true },
  );

  if (!comWithoutULike) {
    throw new NotFoundError('Comment not found');
  }

  comWithoutULike.populateWithCurrentUserProps(user);

  res.status(201).send({
    likes: comWithoutULike.likes,
    likedByCurrentUser: comWithoutULike.likedByCurrentUser,
    message: 'User like added',
  });
});

export default handler;
