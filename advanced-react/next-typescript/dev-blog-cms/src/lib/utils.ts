import { NextApiRequest, type NextApiHandler, NextApiResponse } from 'next';
import formidable from 'formidable';
import { User, getServerSession } from 'next-auth';

import { CustomError } from '@/errors/custom-error';
import { UnAuthorizedError } from '@/errors/unauthorized-error';
import { UnAuthenticatedError } from '@/errors/unauthenticated-error';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export function catchAsync(fn: NextApiHandler): NextApiHandler {
  return (req, res) => {
    const promise = fn(req, res) as Promise<void>;

    promise.catch((err: any) => {
      console.log(err);

      if (err instanceof CustomError) {
        return res.status(err.statusCode).send({
          error: err.serializeErrors(),
        });
      }

      console.log(err);

      res.status(500).send({
        error: [{ message: err.message || 'Something went wrong' }],
      });
    });
  };
}

export async function readForm(
  req: NextApiRequest,
): Promise<{ body: { [key: string]: any }; files: formidable.Files }> {
  const form = formidable();
  const [fields, files] = await form.parse(req);

  const body: any = {};
  for (const key in fields) body[key] = fields[key][0];

  return { body, files };
}

export async function getUser(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  return { user: session?.user };
}

export async function requireUser(req: NextApiRequest, res: NextApiResponse) {
  const { user } = await getUser(req, res);

  if (!user) throw new UnAuthenticatedError();
  return { user };
}

export async function requireAdmin(req: NextApiRequest, res: NextApiResponse) {
  const { user } = await getUser(req, res);

  if (!user) throw new UnAuthenticatedError();
  const isAdmin = user.role === 'admin';

  if (!isAdmin) throw new UnAuthorizedError();
  return { user };
}

export async function wait(seconds: number) {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}
