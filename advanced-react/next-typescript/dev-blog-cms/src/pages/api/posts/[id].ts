import { NextApiHandler } from 'next';
import { ICustomError } from '@/types';
import { catchAsync, readForm, requireAdmin } from '@/lib/utils';
import { connectToDb } from '@/lib/db';
import { postUpdateValidationSchema, validateSchema } from '@/lib/validator';
import { CustomError } from '@/errors/custom-error';
import { Comment, Post } from '@/models';
import { cloudinary } from '@/lib/cloudinary';
import { NotFoundError } from '@/errors/not-found-error';
import { UnAuthorizedError } from '@/errors/unauthorized-error';

const folder_name = 'dev-blog-cms/blogs';
export const config = {
  api: { bodyParser: false },
};

const handler: NextApiHandler = (req, res) => {
  const { method } = req;

  switch (method) {
    case 'PATCH':
      return updatePost(req, res);

    case 'DELETE':
      return deletePost(req, res);

    default:
      const error: ICustomError[] = [{ message: 'No Endpoint exists' }];
      return res.status(404).send({ error });
  }
};

const updatePost = catchAsync(async (req, res) => {
  await connectToDb();
  const { user } = await requireAdmin(req, res);

  const id = req.query.id;
  const previousPost = await Post.findById(id);

  if (!previousPost) {
    throw new NotFoundError('Post not found');
  }

  if (previousPost.author.toString() !== user.id.toString()) {
    throw new UnAuthorizedError();
  }

  const { body, files } = await readForm(req);

  // thumbnail handler
  if (files.thumbnail) {
    if (
      previousPost &&
      previousPost.thumbnail &&
      previousPost.thumbnail.public_id
    ) {
      // destroy the previous image
      await cloudinary.uploader.destroy(previousPost.thumbnail.public_id);
    }

    const thumbnail = files.thumbnail[0];

    const { secure_url: url, public_id } = await cloudinary.uploader.upload(
      thumbnail.filepath,
      {
        folder: folder_name,
      },
    );

    // in the 'readForm' this array is converted into non-array primitive and objects
    body.thumbnail = { url, public_id };
  }

  if (body.tags && typeof body.tags === 'string')
    body.tags = JSON.parse(body.tags);

  if (body.thumbnail && typeof body.thumbnail === 'string')
    body.thumbnail = JSON.parse(body.thumbnail);

  const results = await validateSchema(postUpdateValidationSchema, body);

  if (results instanceof CustomError) {
    throw results;
  }

  const post = await previousPost.updateOne(results, {
    new: true,
    runValidators: true,
  });
  await Promise.all([res.revalidate('/'), res.revalidate(`/${post?.slug}`)]);
  res.send({ post });
});

const deletePost = catchAsync(async (req, res) => {
  await connectToDb();
  await requireAdmin(req, res);

  const id = req.query.id;
  const previousPost = await Post.findById(id);
  if (!previousPost) {
    throw new NotFoundError('Post not found');
  }

  // thumbnail handler
  if (previousPost.thumbnail && previousPost.thumbnail.public_id) {
    await cloudinary.uploader.destroy(previousPost.thumbnail.public_id);
  }

  // delete post comments and replies
  const chiefComments = await Comment.find({
    belongsTo: previousPost.id,
    chiefComment: true,
  });

  const commentIds = chiefComments.map(com => com.id as string);

  // replies
  for (const chiefComment of chiefComments) {
    const replies = await Comment.find({ repliedTo: chiefComment.id });
    const replyIds = replies.map(rep => rep.id);
    commentIds.push(...replyIds);
  }

  const promises = [
    previousPost.deleteOne(),
    Comment.deleteMany({ _id: { $in: commentIds } }),
  ];

  await Promise.all([
    ...promises,
    res.revalidate('/'),
    res.revalidate(`/${previousPost.slug}`),
  ]);

  res.send({ message: 'Successfully deleted the post' });
});

export default handler;
