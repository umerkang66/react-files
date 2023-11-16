import { z } from 'zod';

export const validateCreatePost = (body: any) => {
  const schema = z.object({
    slug: z.string(),
    title: z.string(),
    content: z.string(),
  });

  return schema.parse(body);
};

export const validateUpdatePost = (body: any) => {
  const schema = z.object({
    title: z.string().optional(),
    content: z.string().optional(),
  });

  return schema.parse(body);
};
