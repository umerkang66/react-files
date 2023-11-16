import { prisma } from '../../prisma';
import {
  catchAsync,
  checkPassword,
  createSendCookieToken,
  encryptPassword,
  removeCookieToken,
} from '../utils';
import { validateSigninUser, validateSignupUser } from '../validators/user';

export const signup = catchAsync(async (req, res) => {
  const body = validateSignupUser(req.body);

  const user = await prisma.user.create({
    data: {
      ...body,
      password: await encryptPassword(body.password),
    },
  });

  createSendCookieToken(user, res, 201);
});

export const signin = catchAsync(async (req, res) => {
  const { email, password } = validateSigninUser(req.body);

  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) throw new Error('401 - User not found');

  // check for password
  const correctPass = await checkPassword(password, user.password);
  if (!correctPass) throw new Error('401 - Password not correct');

  createSendCookieToken(user, res, 200);
});

export const signout = catchAsync((_, res) => {
  removeCookieToken(res);
});

export const me = catchAsync((req, res) => {
  res.send({ user: { ...req.user, password: undefined } });
});
