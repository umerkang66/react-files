import { getMarkRange, useEditor, type Range } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import Youtube from '@tiptap/extension-youtube';
import Image from '@tiptap/extension-image';
import { useState } from 'react';

export function useEditorConfig(options?: { placeholder?: string }) {
  const [selectionRange, setSelectionRange] = useState<Range>();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({
        placeholder: options?.placeholder || 'Type something',
      }),
      Link.configure({
        autolink: false,
        linkOnPaste: false,
        // don't open it inside the editor
        openOnClick: false,
        HTMLAttributes: {
          // by default editor set the target to '_blank'
          target: '',
        },
      }),
      Youtube.configure({
        // you can know these values from youtube embed link from youtube.com
        HTMLAttributes: {
          class: 'w-full aspect-video',
        },
      }),
      Image.configure({
        HTMLAttributes: { class: 'mx-auto' },
      }),
    ],
    editorProps: {
      handleClick(view, pos, event) {
        const { state } = view;

        // if 'link' in the selection range, then we are going to get that range
        const selectionRange = getMarkRange(
          // this 'pos' is where we clicked inside the editor
          state.doc.resolve(pos),
          state.schema.marks.link,
        );

        // range is where from the text starts, and to where the text ends
        if (selectionRange) setSelectionRange(selectionRange);
      },
      attributes: {
        // these classes will be applied to editor 'input | textarea'
        // these classes are coming from tailwind typography plugin
        class:
          'prose prose-lg dark:prose-invert mx-auto h-full max-w-full focus:outline-none outline-none',
      },
    },
  });

  return { editor, selectionRange };
}
