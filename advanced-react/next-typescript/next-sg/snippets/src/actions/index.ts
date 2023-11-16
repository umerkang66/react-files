'use server';

import { db } from '@/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createSnippet(
  formState: { message: string },
  formData: FormData
) {
  try {
    // Check the user's input make sure they're valid
    const title = formData.get('title') as string;
    const code = formData.get('code') as string;

    if (typeof title !== 'string' || title.length < 3) {
      // this will be caught in the useFormHook
      return { message: 'Title must be longer' };
    }

    if (typeof code !== 'string' || code.length < 10) {
      // this will be caught in the useFormHook
      return { message: 'Code must be longer' };
    }

    // Create a new record in the database
    await db.snippet.create({ data: { title, code } });
  } catch (err) {
    if (err instanceof Error) {
      return { message: err.message };
    } else {
      return { message: 'Something went wrong' };
    }
  }

  revalidatePath('/');
  // Redirect the user back to the root route
  redirect('/');
}

export async function editSnippet(id: number, code: string) {
  await db.snippet.update({
    where: { id },
    data: { code },
  });

  revalidatePath(`/snippets/${id}`);
  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
  await db.snippet.delete({ where: { id } });

  revalidatePath('/');
  redirect('/');
}
