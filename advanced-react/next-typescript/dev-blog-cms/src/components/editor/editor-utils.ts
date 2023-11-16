import type { Editor } from '@tiptap/react';

export const getFocusedEditor = (editor: Editor) => editor.chain().focus();

export const validateLink = (url: string): string => {
  let finalUrl: URL;

  try {
    finalUrl = new URL(url);
  } catch (err) {
    finalUrl = new URL('http://' + url);
  }

  return finalUrl.origin;
};
