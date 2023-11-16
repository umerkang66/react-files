import { connectToDb } from '@/lib/db';
import { catchAsync, requireAdmin } from '@/lib/utils';
import { User } from '@/models';
import { ICustomError } from '@/types';
import { NextApiHandler } from 'next';

const handler: NextApiHandler = (req, res) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      return getAllUsers(req, res);

    default:
      const error: ICustomError[] = [{ message: 'No Endpoint exists' }];
      return res.status(404).send({ error });
  }
};

const getAllUsers = catchAsync(async (req, res) => {
  const limit = +(req.query.limit as string) ?? 9;
  const page = +(req.query.page as string);
  const skip = +(req.query.skip as string);

  await connectToDb();
  await requireAdmin(req, res);

  const query = User.find();

  if (limit) query.limit(limit);
  if (!skip) {
    if (page) query.skip((page - 1) * limit);
    else query.skip(0); // page should be one, so don't skip anything
  }
  if (skip && !page) query.skip(skip);

  const users = await query;

  res.send({ users });
});

export default handler;
