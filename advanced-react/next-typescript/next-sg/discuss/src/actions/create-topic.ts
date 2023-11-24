'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import type { Topic } from '@prisma/client';
import { auth } from '@/auth';
import { db } from '@/db';
import { paths } from '@/paths';
import { revalidatePath } from 'next/cache';

const createTopicSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/[a-z-]/, {
      message: 'Must be lowercase letters or dashes without spaces',
    }),
  description: z.string().min(10),
});

interface CreateTopicFormState {
  errors: {
    name?: string[];
    description?: string[];
    // errors that occurred in the form level
    // future proofing, that errors might have form prop
    // so we added _form
    _form?: string[];
  };
}

// the first argument is coming from useFormState, and so satisfy the type, same type should be returned. and the same type should be
export async function createTopic(
  formState: CreateTopicFormState,
  formData: FormData
): Promise<CreateTopicFormState> {
  const result = createTopicSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
  });

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  const session = await auth();
  if (!session || !session.user) {
    return { errors: { _form: ['You must be signed in to do this.'] } };
  }

  let topic: Topic;
  try {
    topic = await db.topic.create({
      data: { slug: result.data.name, description: result.data.description },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return { errors: { _form: [err.message] } };
    }
    return { errors: { _form: ['Something went wrong'] } };
  }

  revalidatePath('/');
  // this throws the error, nothing else after it will not run, that next automatically catches, and redirects the page.
  redirect(paths.topicShow(topic.slug));
}
