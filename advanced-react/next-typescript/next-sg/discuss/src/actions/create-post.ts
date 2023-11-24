'use server';

import { auth } from '@/auth';
import { db } from '@/db';
import { paths } from '@/paths';
import { Post } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const createPostSchema = z.object({
  slug: z.string(),
  title: z
    .string()
    .min(3)
    .regex(/[a-z-]/, {
      message: 'Must be lowercase letters or dashes without spaces',
    }),
  content: z.string().min(10),
});

interface CreatePostFormState {
  errors: {
    title?: string[];
    content?: string[];
    // errors that occurred in the form level
    // future proofing, that errors might have form prop
    // so we added _form
    _form?: string[];
  };
}

export async function createPost(
  formState: CreatePostFormState,
  formData: FormData
): Promise<CreatePostFormState> {
  const result = createPostSchema.safeParse({
    slug: formData.get('slug'),
    title: formData.get('title'),
    content: formData.get('content'),
  });

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  const session = await auth();
  if (!session || !session.user) {
    return { errors: { _form: ['You must be signed in to do this.'] } };
  }

  const parentTopic = await db.topic.findFirst({
    where: { slug: result.data.slug },
  });
  if (!parentTopic) {
    return { errors: { _form: ["Parent Topic doesn't found"] } };
  }

  let post: Post;
  try {
    post = await db.post.create({
      data: {
        topicId: parentTopic.id,
        userId: session.user.id,
        title: result.data.title,
        content: result.data.content,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return { errors: { _form: [err.message] } };
    }
    return { errors: { _form: ['Something went wrong'] } };
  }

  revalidatePath(paths.topicShow(result.data.slug));
  // this throws the error, nothing else after it will not run, that next automatically catches, and redirects the page.
  redirect(paths.postShow(result.data.slug, post.id));
}
