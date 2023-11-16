import { FC, useCallback, useState } from 'react';
import { BsBoxArrowUpRight, BsPencilSquare } from 'react-icons/bs';
import { BiUnlink } from 'react-icons/bi';
import { BubbleMenu, Editor } from '@tiptap/react';
import { LinkForm, LinkOption } from './link-form';
import { getFocusedEditor } from '../editor-utils';

type Props = { editor: Editor };

const EditLink: FC<Props> = ({ editor }) => {
  const [showEditForm, setShowEditForm] = useState(false);

  const handleOnLinkOpenClick = useCallback(() => {
    const { href } = editor.getAttributes('link');
    window.open(href, '_blank');
  }, [editor]);

  const handleLinkEditClick = () => {
    setShowEditForm(true);
  };

  const handleUnlinkClick = () => {
    editor.commands.unsetLink();
  };

  const getInitialState = useCallback<() => LinkOption>(() => {
    const { href, target } = editor.getAttributes('link');

    return { url: href, openInNewTab: target ? true : false };
  }, [editor]);

  const handleSubmit = ({ url, openInNewTab }: LinkOption) => {
    // editor will keep track of the state, and remove only the link that is selected
    getFocusedEditor(editor)
      .unsetLink()
      .setLink({ href: url, target: openInNewTab ? '_blank' : '' })
      .run();

    setShowEditForm(false);
  };

  return (
    <BubbleMenu
      shouldShow={({ editor }) => editor.isActive('link')}
      editor={editor}
      tippyOptions={{
        onHide: () => setShowEditForm(false),
        appendTo: 'parent',
      }}
    >
      <LinkForm
        visible={showEditForm}
        onSubmit={handleSubmit}
        initialState={getInitialState()}
      />
      {!showEditForm && (
        <div className="z-50 flex items-center space-x-6 rounded bg-primary p-3 text-primary-dark shadow-md shadow-secondary-dark dark:bg-primary-dark dark:text-primary">
          <button onClick={handleOnLinkOpenClick}>
            <BsBoxArrowUpRight />
          </button>

          <button onClick={handleLinkEditClick}>
            <BsPencilSquare />
          </button>

          <button onClick={handleUnlinkClick}>
            <BiUnlink />
          </button>
        </div>
      )}
    </BubbleMenu>
  );
};

export { EditLink };
