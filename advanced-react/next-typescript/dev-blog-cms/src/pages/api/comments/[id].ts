import { NextApiHandler } from 'next';
import { ICustomError } from '@/types';
import { catchAsync, requireUser } from '@/lib/utils';
import { Comment, CommentDocument, Post } from '@/models';
import { connectToDb } from '@/lib/db';
import { NotFoundError } from '@/errors/not-found-error';
import { commentUpdateValidationSchema, validateSchema } from '@/lib/validator';
import { CustomError } from '@/errors/custom-error';

const handler: NextApiHandler = (req, res) => {
  const { method } = req;

  switch (method) {
    case 'PATCH':
      return updateComment(req, res);

    case 'DELETE':
      return deleteComment(req, res);

    default:
      const error: ICustomError[] = [{ message: 'No Endpoint exists' }];
      return res.status(404).send({ error });
  }
};

const updateComment = catchAsync(async (req, res) => {
  const { user } = await requireUser(req, res);
  const commentId = req.query.id as string;
  const data = await validateSchema(commentUpdateValidationSchema, req.body);

  if (data instanceof CustomError) {
    throw data;
  }

  await connectToDb();

  if (user.role === 'admin') {
    // if user is 'admin', don't delete the likes and replies
    const comment = await Comment.findByIdAndUpdate(
      commentId,
      { $set: { content: data.content } },
      { runValidators: true, new: true },
    );

    if (!comment) {
      throw new NotFoundError(
        "Comment not found, or you don't own the comment",
      );
    }

    return res.status(200).send({ comment });
  }

  // if the comment is updated, delete all the likes
  const comment = await Comment.findOneAndUpdate(
    { _id: commentId, owner: user.id },
    { $set: { content: data.content, likes: [] } },
    { runValidators: true, new: true },
  );

  if (!comment) {
    throw new NotFoundError("Comment not found, or you don't own the comment");
  }

  // if the comment is updated, delete all its replies
  await Comment.deleteMany({ repliedTo: comment.id });

  res.status(200).send({ comment });
});

const deleteComment = catchAsync(async (req, res) => {
  const { user } = await requireUser(req, res);
  const commentId = req.query.id as string;
  await connectToDb();

  // if user is admin, he doesn't have to be owner
  if (user.role === 'admin') {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      throw new NotFoundError('Comment not found');
    }
    await deleteCommentAndReplies(comment);
    return res.status(204).send(null);
  }

  const comment = await Comment.findOne({
    _id: commentId,
    owner: user.id,
  });
  if (!comment) {
    throw new NotFoundError("Comment not found, or you don't own the comment");
  }

  await deleteCommentAndReplies(comment);
  res.status(204).send(null);
});

async function deleteCommentAndReplies(
  comment: CommentDocument,
): Promise<void> {
  const promises: Promise<any>[] = [
    comment.deleteOne(),
    Comment.deleteMany({ repliedTo: comment.id }),
  ];

  await Promise.all(promises);
}

export default handler;
