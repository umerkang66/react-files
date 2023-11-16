import { RequestHandler } from 'express';
import { type User } from '@prisma/client';
import { catchAsync, parseCookie } from './utils';
import { prisma } from '../prisma';

declare global {
  namespace Express {
    interface Request {
      user?: User | null;
    }
  }
}

export const currentUser: RequestHandler = async (req, res, next) => {
  try {
    const payload = parseCookie(req.cookies.token);
    const userId = payload.userId;

    // don't do anything in the catch block
    const user = await prisma.user.findUnique({ where: { id: userId } });

    req.user = user;
  } catch (err) {}

  next();
};

// always use it after currentUser
export const requireAuth = catchAsync((req, res, next) => {
  if (!req.user) throw new Error('401 - Unauthorized');

  next();
});
