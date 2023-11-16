import { NextApiHandler } from 'next';
import { getServerSession } from 'next-auth';

import { CustomError } from '@/errors/custom-error';
import { cloudinary } from '@/lib/cloudinary';
import { connectToDb } from '@/lib/db';
import { getPosts } from '@/lib/server-utils-for-client';
import { catchAsync, readForm, requireAdmin } from '@/lib/utils';
import { postValidationSchema, validateSchema } from '@/lib/validator';
import { Post } from '@/models';
import { ICustomError } from '@/types';

const folder_name = 'dev-blog-cms/blogs';
export const config = {
  api: { bodyParser: false },
};

const handler: NextApiHandler = (req, res) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      return readPostsForClient(req, res);
    case 'POST':
      return createPost(req, res);

    default:
      const error: ICustomError[] = [{ message: 'No Endpoint exists' }];
      return res.status(404).send({ error });
  }
};

const readPostsForClient = catchAsync(async (req, res) => {
  // normally on the first time (SSR), 'getPosts' will be called from getServerSideProps, but to call from the client, we have use this api handler
  let page = (+(req.query.page as string) ?? undefined) as number | undefined;
  const limit = +(req.query.limit as string) ?? 9;
  const skip = (+(req.query.skip as string) ?? undefined) as number | undefined;

  if (!page && !skip) page = 1;

  // now this can be called through useEffect, or react-query or SWR
  const posts = await getPosts({ page, limit, skip });

  res.send({ posts });
});

const createPost = catchAsync(async (req, res) => {
  await connectToDb();
  const { user } = await requireAdmin(req, res);

  const { body, files } = await readForm(req);

  // thumbnail handler
  if (files.thumbnail) {
    const thumbnail = files.thumbnail[0];

    const { secure_url: url, public_id } = await cloudinary.uploader.upload(
      thumbnail.filepath,
      { folder: folder_name },
    );

    // in the 'readForm' this array is converted into non-array primitive and objects
    body.thumbnail = { url, public_id };
  }

  if (body.tags && typeof body.tags === 'string') {
    body.tags = JSON.parse(body.tags);
  }

  const results = await validateSchema(postValidationSchema, body);

  if (results instanceof CustomError) {
    throw results;
  }

  const post = await Post.create({ ...results, author: user.id });

  await Promise.all([res.revalidate('/'), res.revalidate(`/${post.slug}`)]);
  res.send({ post });
});

export default handler;
