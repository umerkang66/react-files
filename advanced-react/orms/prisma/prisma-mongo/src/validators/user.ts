import { z } from 'zod';

export const validateSignupUser = (body: any) => {
  const userSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
  });

  return userSchema.parse(body);
};

export const validateSigninUser = (body: any) => {
  const userSchema = z.object({
    email: z.string(),
    password: z.string(),
  });

  return userSchema.parse(body);
};
