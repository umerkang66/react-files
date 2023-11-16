import { User } from '@prisma/client';
import {
  type RequestHandler,
  type CookieOptions,
  type Response,
} from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// 60 days in the future
const cookieOptions: CookieOptions = {
  expires: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
  // manipulate through server only
  httpOnly: true,
};

function getJWTToken(userId: string) {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: '60 days',
  });
}

export function createSendCookieToken(
  user: User,
  res: Response,
  status?: number
) {
  const token = getJWTToken(user.id);

  res
    .status(status ?? 200)
    .cookie('token', token, cookieOptions)
    .send({ success: true, token, user: { ...user, password: undefined } });
}

export function parseCookie(cookie: string) {
  return jwt.verify(cookie, process.env.JWT_SECRET!) as JwtPayload & {
    userId?: string;
  };
}

export function removeCookieToken(res: Response) {
  res.clearCookie('token', cookieOptions).send({
    message: 'Successfully logged out',
  });
}

export function catchAsync<T = any>(fn: RequestHandler<T>): RequestHandler<T> {
  return (req, res, next) => {
    const returned: any = fn(req, res, next);
    if (returned instanceof Promise) returned.catch(next);
  };
}

export function encryptPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export function checkPassword(reqPassword: string, userPassword: string) {
  return bcrypt.compare(reqPassword, userPassword);
}
