import { useEffect, type FC } from 'react';
import { EditorContent } from '@tiptap/react';
import { useEditorConfig } from '@/hooks/use-editor-config';
import { ActionButton } from './ui/button';
import { getFocusedEditor } from '../editor/editor-utils';

type Props = {
  placeholder?: string;
  title?: string;
  busy?: boolean;
  btnTitle?: string;
  initialState?: string;
  onSubmit?: (content: string) => void;
  onClose?: () => void;
};

const CommentForm: FC<Props> = ({
  placeholder,
  title,
  busy = false,
  btnTitle,
  initialState,
  onSubmit,
  onClose,
}) => {
  const { editor } = useEditorConfig({
    placeholder: placeholder ?? 'Add your comment...',
  });

  const handleSubmit = () => {
    if (!editor || busy) return;

    const value = editor.getHTML();
    if (value === '<p></p>') return;
    onSubmit && onSubmit(value);
  };

  useEffect(() => {
    if (editor) {
      getFocusedEditor(editor).setContent(initialState!).run();
    }
  }, [editor, initialState]);

  return (
    <div>
      {!!title && (
        <h1 className="py-3 text-xl font-semibold text-primary-dark dark:text-primary">
          {title}
        </h1>
      )}
      <EditorContent
        onClick={() => getFocusedEditor(editor!).run()}
        className="min-h-[100px] cursor-text rounded border-[1px] border-secondary-dark p-2"
        editor={editor}
      />

      <div className="justify-end py-3 md:flex">
        <div className="flex space-x-4">
          <ActionButton
            title={btnTitle ?? 'Submit'}
            onClick={handleSubmit}
            busy={busy}
          />

          {!!onClose && (
            <button
              onClick={onClose}
              className="text-primary-dark dark:text-primary"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export { CommentForm };
