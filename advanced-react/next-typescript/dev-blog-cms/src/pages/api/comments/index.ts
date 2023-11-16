import { NextApiHandler } from 'next';
import { All, ICustomError } from '@/types';
import { catchAsync, getUser, requireAdmin, requireUser } from '@/lib/utils';
import {
  commentCreateValidationSchema,
  getCommentsValidationSchema,
  validateSchema,
} from '@/lib/validator';
import { CustomError } from '@/errors/custom-error';
import { Comment, CommentDocument, Post } from '@/models';
import { connectToDb } from '@/lib/db';
import { NotFoundError } from '@/errors/not-found-error';

const handler: NextApiHandler = (req, res) => {
  const { method } = req;
  switch (method) {
    case 'GET':
      return getComments(req, res);
    case 'POST':
      return createNewComment(req, res);
    default:
      const error: ICustomError[] = [{ message: 'No Endpoint exists' }];
      return res.status(404).send({ error });
  }
};

const all: All = '*';

const getComments = catchAsync(async (req, res) => {
  // 'getUser' doesn't throw an error
  const { user } = await getUser(req, res);
  const userSelect = 'name email role avatar';
  await connectToDb();

  const limit = +(req.query.limit as string) ?? 9;
  const page = +(req.query.page as string);
  const skip = +(req.query.skip as string);

  if (req.query.belongsTo === all) {
    // for this action admin is required
    await requireAdmin(req, res);

    const query = Comment.find({
      // comments other than chiefComments are
      chiefComment: true,
    }).populate([
      { path: 'replies', populate: [{ path: 'owner', select: userSelect }] },
      { path: 'owner', select: userSelect },
      { path: 'belongsTo', select: 'title slug' },
    ]);

    if (limit) query.limit(limit);
    if (!skip) {
      if (page) query.skip((page - 1) * limit);
      else query.skip(0); // page should be one, so don't skip anything
    }
    if (skip && !page) query.skip(skip);

    const comments = await query;
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
    return res.send({ comments });
  }

  const data = await validateSchema(getCommentsValidationSchema, req.query);
  if (data instanceof CustomError) throw data;

  // don't populate the likes, we just needs the length of the likes
  // a virtual property already checks, if currentUser has liked the comment or not
  const query = Comment.find({
    belongsTo: data.belongsTo,
    // comments other than chiefComments are
    chiefComment: true,
  }).populate([
    {
      path: 'replies',
      populate: [{ path: 'owner', select: userSelect }],
    },
    { path: 'owner', select: userSelect },
  ]);

  if (limit) query.limit(limit);
  if (!skip) {
    if (page) query.skip((page - 1) * limit);
    else query.skip(0); // page should be one, so don't skip anything
  }
  if (skip && !page) query.skip(skip);

  const comments = await query;

  // if there is no 'user' no need for checking,
  if (user) {
    // set the 'prop' likedByCurrentUser, in each comment document, through this method
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

  res.send({ comments });
});

const createNewComment = catchAsync(async (req, res) => {
  const { user } = await requireUser(req, res);

  const data = await validateSchema(commentCreateValidationSchema, req.body);

  if (data instanceof CustomError) throw data;

  await connectToDb();

  if (!(await Post.findById(data.belongsTo))) {
    throw new NotFoundError('Post to which this comment belongs to not found');
  }

  const comment = await Comment.create({
    owner: user.id,
    // whenever we will create a main comment, chiefComment will be true
    chiefComment: true,
    // post to which this comment belongs to
    belongsTo: data.belongsTo,
    content: data.content,
  });

  // A LITTLE HACK: to populate owner in the comment that is created
  const commentWithOwner = await Comment.findById(comment.id).populate('owner');

  if (user) commentWithOwner!.populateWithCurrentUserProps(user);

  res.status(201).send({ comment: commentWithOwner });
});

export default handler;
