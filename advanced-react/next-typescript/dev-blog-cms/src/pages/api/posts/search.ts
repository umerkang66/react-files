import { NextApiHandler } from 'next';
import { ICustomError } from '@/types';
import { catchAsync, requireAdmin } from '@/lib/utils';
import { connectToDb } from '@/lib/db';
import { BadRequestError } from '@/errors/bad-request-error';
import { Post } from '@/models';

const handler: NextApiHandler = (req, res) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      return searchPost(req, res);

    default:
      const error: ICustomError[] = [{ message: 'No Endpoint exists' }];
      return res.status(404).send({ error });
  }
};

const searchPost = catchAsync(async (req, res) => {
  await connectToDb();
  await requireAdmin(req, res);

  const search = req.query.search as string;
  if (!search.trim()) {
    throw new BadRequestError('Search query param must be provided');
  }

  const posts = await Post.find({
    // 'i' means case insensitive
    title: { $regex: search, $options: 'i' },
  });

  res.send({ posts });
});

export default handler;
