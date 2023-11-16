import { type Editor } from '@tiptap/react';
import { FC } from 'react';

import { AiFillCaretDown } from 'react-icons/ai';
import {
  BsTypeBold,
  BsTypeStrikethrough,
  BsBraces,
  BsCode,
  BsListOl,
  BsListUl,
  BsTypeItalic,
  BsTypeUnderline,
  BsImageFill,
} from 'react-icons/bs';
import { RiDoubleQuotesL } from 'react-icons/ri';

import { Dropdown } from '@/components/common/ui/dropdown';
import { getFocusedEditor } from '../editor-utils';
import { ToolBarButton } from './toolbar-button';
import { InsertLink } from '../link/insert-link';
import { LinkOption } from '../link/link-form';
import { EmbedYoutube } from './embed-youtube';

type Props = { editor: Editor | null; onOpenImageClick?: () => void };

// heading 1,2,3 "bold" "italic" "underline" "strike" "quote" "code" "code-block" "insert-link" "lists (ol and ul)" "embed youtube" "insert image"

type Option = { label: string; onClick?: () => void };

const ToolBar: FC<Props> = ({ editor, onOpenImageClick }) => {
  if (!editor) return null;

  const options: Option[] = [
    {
      label: 'Paragraph',
      onClick: () => getFocusedEditor(editor).setParagraph().run(),
    },
    {
      label: 'Heading 1',
      onClick: () => getFocusedEditor(editor).toggleHeading({ level: 1 }).run(),
    },
    {
      label: 'Heading 2',
      onClick: () => getFocusedEditor(editor).toggleHeading({ level: 2 }).run(),
    },
    {
      label: 'Heading 3',
      onClick: () => getFocusedEditor(editor).toggleHeading({ level: 3 }).run(),
    },
  ];

  const getLabel = (): string => {
    if (editor.isActive('heading', { level: 1 })) return 'Heading 1';
    if (editor.isActive('heading', { level: 2 })) return 'Heading 2';
    if (editor.isActive('heading', { level: 3 })) return 'Heading 3';

    return 'Paragraph';
  };

  const handleLinkSubmit = ({ url, openInNewTab }: LinkOption) => {
    const { commands } = editor;

    if (openInNewTab) commands.setLink({ href: url, target: '_blank' });
    else commands.setLink({ href: url });
  };

  const handleEmbedYoutube = (url: string) => {
    getFocusedEditor(editor).setYoutubeVideo({ src: url }).run();
  };

  return (
    <div className="flex items-center">
      <Dropdown options={options} head={<Head label={getLabel()} />} />

      <div className="bg-secondary-dark dark:bg-secondary-light mx-8 h-4 w-[1px]" />

      <div className="flex items-center space-x-3">
        <ToolBarButton
          active={editor.isActive('bold')}
          onClick={() => getFocusedEditor(editor).toggleBold().run()}
        >
          <BsTypeBold />
        </ToolBarButton>

        <ToolBarButton
          active={editor.isActive('italic')}
          onClick={() => getFocusedEditor(editor).toggleItalic().run()}
        >
          <BsTypeItalic />
        </ToolBarButton>

        <ToolBarButton
          active={editor.isActive('underline')}
          onClick={() => getFocusedEditor(editor).toggleUnderline().run()}
        >
          <BsTypeUnderline />
        </ToolBarButton>

        <ToolBarButton
          active={editor.isActive('strike')}
          onClick={() => getFocusedEditor(editor).toggleStrike().run()}
        >
          <BsTypeStrikethrough />
        </ToolBarButton>
      </div>

      <div className="bg-secondary-dark dark:bg-secondary-light mx-8 h-4 w-[1px]" />

      <div className="flex items-center space-x-3">
        <ToolBarButton
          active={editor.isActive('blockquote')}
          onClick={() => getFocusedEditor(editor).toggleBlockquote().run()}
        >
          <RiDoubleQuotesL />
        </ToolBarButton>

        <ToolBarButton
          active={editor.isActive('code')}
          onClick={() => getFocusedEditor(editor).toggleCode().run()}
        >
          <BsCode />
        </ToolBarButton>

        <ToolBarButton
          active={editor.isActive('codeBlock')}
          onClick={() => getFocusedEditor(editor).toggleCodeBlock().run()}
        >
          <BsBraces />
        </ToolBarButton>

        <InsertLink onSubmit={handleLinkSubmit} />

        <ToolBarButton
          active={editor.isActive('orderedList')}
          onClick={() => getFocusedEditor(editor).toggleOrderedList().run()}
        >
          <BsListOl />
        </ToolBarButton>

        <ToolBarButton
          active={editor.isActive('bulletList')}
          onClick={() => getFocusedEditor(editor).toggleBulletList().run()}
        >
          <BsListUl />
        </ToolBarButton>
      </div>

      <div className="bg-secondary-dark dark:bg-secondary-light mx-8 h-4 w-[1px]" />

      <div className="flex items-center space-x-3">
        <EmbedYoutube onSubmit={handleEmbedYoutube} />

        <ToolBarButton onClick={onOpenImageClick}>
          <BsImageFill />
        </ToolBarButton>
      </div>
    </div>
  );
};

const Head: FC<{ label: string }> = ({ label }) => {
  return (
    <div className="text-primary-dark dark:text-primary flex items-center space-x-2">
      <p>{label}</p>
      <AiFillCaretDown />
    </div>
  );
};

export { ToolBar };
