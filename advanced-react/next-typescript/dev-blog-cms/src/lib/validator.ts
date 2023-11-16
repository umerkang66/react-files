import { RequestZodValidationError } from '@/errors/req-validation-error';
import { Post } from '@/models';
import { isValidObjectId } from 'mongoose';
import { type Schema, z } from 'zod';
import { fromZodError } from 'zod-validation-error';

// since during create and update, all the properties came so we shouldn't use different schemas
export const postValidationSchema = z.object({
  title: z.string().nonempty("Title shouldn't be empty"),
  content: z.string().nonempty("Content shouldn't be empty"),
  slug: z
    .string()
    .nonempty("Slug shouldn't be empty")
    .refine(
      async slug => {
        // no need for db start, because db should already be started in the edge
        const post = await Post.findOne({ slug });
        return post ? false : true;
      },
      { message: 'Slug should be unique, it cannot be duplicated' },
    ),
  meta: z.string().nonempty("Meta shouldn't be empty"),
  tags: z.array(z.string()),
  thumbnail: z
    .object({
      url: z.string().nonempty("Thumbnail Url shouldn't be empty"),
      public_id: z.string().nonempty("Thumbnail public_id shouldn't be empty"),
    })
    .optional(),
});

export const postUpdateValidationSchema = z.object({
  title: z.string().nonempty("Title shouldn't be empty").optional(),
  content: z.string().nonempty("Content shouldn't be empty").optional(),
  meta: z.string().nonempty("Meta shouldn't be empty").optional(),
  tags: z.array(z.string()).optional(),
  thumbnail: z
    .object({
      url: z.string().nonempty("Thumbnail Url shouldn't be empty"),
      public_id: z.string().nonempty("Thumbnail public_id shouldn't be empty"),
    })
    .optional(),
});

export const commentCreateValidationSchema = z.object({
  belongsTo: z.string().refine(isValidObjectId),
  content: z.string(),
});

export const commentUpdateValidationSchema = z.object({ content: z.string() });

export const getCommentsValidationSchema = z.object({
  // this is 'postId'
  belongsTo: z.string().refine(isValidObjectId),
});

export const replyToCommentValidationSchema = z.object({
  repliedTo: z.string().refine(isValidObjectId),
  content: z.string(),
});

export const commentUpdateLikeSchema = z.object({
  commentId: z.string().refine(isValidObjectId),
});

export const postUpdateLikeSchema = z.object({
  postId: z.string().refine(isValidObjectId),
});

export const validateSchema = async <T extends Schema>(
  schema: T,
  value: any,
): Promise<z.infer<typeof schema> | RequestZodValidationError> => {
  const results = await schema.safeParseAsync(value);
  if (!results.success) {
    return new RequestZodValidationError(fromZodError(results.error));
  }

  return results.data;
};
