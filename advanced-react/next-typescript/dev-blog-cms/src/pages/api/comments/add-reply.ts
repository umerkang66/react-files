import { NextApiHandler } from 'next';
import { ICustomError } from '@/types';
import { catchAsync, requireUser } from '@/lib/utils';
import {
  replyToCommentValidationSchema,
  validateSchema,
} from '@/lib/validator';
import { CustomError } from '@/errors/custom-error';
import { Comment } from '@/models';
import { connectToDb } from '@/lib/db';
import { NotFoundError } from '@/errors/not-found-error';
import { BadRequestError } from '@/errors/bad-request-error';

const handler: NextApiHandler = (req, res) => {
  const { method } = req;

  switch (method) {
    case 'POST':
      return addReplyToComment(req, res);

    default:
      const error: ICustomError[] = [{ message: 'No Endpoint exists' }];
      return res.status(404).send({ error });
  }
};

const addReplyToComment = catchAsync(async (req, res) => {
  const { user } = await requireUser(req, res);

  const data = await validateSchema(replyToCommentValidationSchema, req.body);

  if (data instanceof CustomError) throw data;

  await connectToDb();

  if (!(await Comment.findOne({ _id: data.repliedTo, chiefComment: true }))) {
    throw new NotFoundError(
      'Comment to which this comment replied to not found',
    );
  }

  const parentComment = await Comment.findById(data.repliedTo);
  if (!parentComment) {
    throw new NotFoundError('Parent Comment not found');
  }
  if (!parentComment.chiefComment) {
    throw new BadRequestError(
      'Comment to whom this comment is replied to, not chief comment',
    );
  }

  const comment = await Comment.create({
    owner: user.id,
    // don't belongs to post, but a reply of a chiefComment
    belongsTo: null,
    repliedTo: data.repliedTo,
    // whenever we will create a reply comment, chiefComment will be false
    chiefComment: false,
    content: data.content,
  });

  // A LITTLE HACK: to populate owner in the comment that is created
  const commentWithOwner = await Comment.findById(comment.id).populate('owner');

  if (user) commentWithOwner!.populateWithCurrentUserProps(user);

  res.status(201).send({ comment: commentWithOwner });
});

export default handler;
