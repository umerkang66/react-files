import { FC, useCallback, useEffect, useState } from 'react';
import { EditorContent, Range } from '@tiptap/react';
import { ToolBar } from './toolbar';
import { EditLink } from './link/edit-link';
import { GalleryModal, ImageSelectionResult } from './gallery-modal';
import { getFocusedEditor } from './editor-utils';
import { SeoForm, SeoResult } from './seo-form';
import { ActionButton } from '@/components/common/ui/button';
import { ThumbnailSelector } from './thumbnail-selector';
import { useImageUpload, useImages } from './editor-hooks';
import type { IImage } from '@/types';
import { useEditorConfig } from '@/hooks/use-editor-config';

export interface FinalPost extends SeoResult {
  title: string;
  content: string;
  thumbnail?: File | IImage;
}

type Props = {
  onSubmit: (post: FinalPost) => void;
  initialValue?: FinalPost;
  btnTitle?: string;
  busy?: boolean;
};

const emptyPost = {
  title: '',
  content: '',
  meta: '',
  tags: '',
  slug: '',
};

// NOTE: We are updating values initialState, for both scenarios SSR, and CSR, because in the case of SSR, the value will be present, but in the case of CSR, first the value will be null, then Value will be loaded
const Editor: FC<Props> = ({ initialValue, btnTitle, busy, onSubmit }) => {
  const [showGallery, setShowGallery] = useState(false);
  const [seoInitialValue, setSeoInitialValue] = useState<SeoResult>();
  const [post, setPost] = useState<FinalPost>(initialValue ?? emptyPost);

  const { images, updateImages } = useImages();
  const { uploadImage, isUploading } = useImageUpload();

  const { editor, selectionRange } = useEditorConfig({
    placeholder: 'Type Something',
  });

  const handleImageSelection = ({ src, altText }: ImageSelectionResult) => {
    getFocusedEditor(editor!).setImage({ src, alt: altText }).run();
  };

  const handleImageUpload = async (image: File) => {
    const newImage = await uploadImage(image);
    if (newImage) {
      updateImages(prev => ({ images: [newImage, ...prev.images] }));
    }
  };

  const handleSeoChange = useCallback((result: SeoResult) => {
    setPost(prev => ({ ...prev, ...result }));
  }, []);

  const updateThumbnail = (file: File) =>
    setPost(prev => ({ ...prev, thumbnail: file }));

  const handleSubmit = () => {
    if (!editor) return;
    onSubmit({ ...post, content: editor.getHTML() });
  };

  useEffect(() => {
    if (editor && selectionRange) {
      // this selection range will come if this is a link, so only if we clicked the link, then the text will be selected
      editor.commands.setTextSelection(selectionRange);
    }
  }, [editor, selectionRange]);

  useEffect(() => {
    if (initialValue) {
      editor?.commands.setContent(initialValue.content);

      const { slug, tags, meta } = initialValue;
      setSeoInitialValue({ slug, tags, meta });
    }
  }, [initialValue, editor]);

  return (
    <>
      <div className="bg-primary p-3 transition dark:bg-primary-dark">
        <div className="sticky top-0 z-10 bg-primary py-3 dark:bg-primary-dark">
          {/* Thumbnail Selector and Submit */}
          <div className="mb-3 flex items-center justify-between">
            <ThumbnailSelector
              onChange={updateThumbnail}
              initialValue={post.thumbnail as File}
            />
            <div className="inline-block">
              <ActionButton
                title={btnTitle ?? 'Submit'}
                onClick={handleSubmit}
                busy={busy}
                disabled={busy}
              />
            </div>
          </div>

          {/* Title Input */}
          <input
            type="text"
            className="mb-3 w-full border-0 border-b-[1px] border-secondary-dark bg-transparent py-2 text-3xl font-semibold italic text-primary-dark outline-none dark:border-secondary-light dark:text-primary"
            placeholder="Title"
            value={post.title}
            onChange={({ target: { value: title } }) =>
              setPost(prev => ({ ...prev, title }))
            }
          />

          <ToolBar
            editor={editor}
            onOpenImageClick={() => setShowGallery(true)}
          />

          <div className="my-3 h-[1px] w-full bg-secondary-dark dark:bg-secondary-light" />
        </div>

        {editor && <EditLink editor={editor} />}

        <EditorContent editor={editor} className="min-h-[300px]" />

        <div className="my-3 h-[1px] w-full bg-secondary-dark dark:bg-secondary-light" />

        <SeoForm
          title={post.title}
          onChange={handleSeoChange}
          initialValue={seoInitialValue}
        />
      </div>

      <GalleryModal
        uploading={isUploading}
        images={images}
        visible={showGallery}
        onClose={() => setShowGallery(false)}
        onFileSelect={handleImageUpload}
        onImageSelect={handleImageSelection}
      />
    </>
  );
};

export { Editor };
