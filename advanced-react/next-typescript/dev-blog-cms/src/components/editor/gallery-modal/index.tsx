import { useState, type FC, ChangeEventHandler } from 'react';
import Image from 'next/image';
import { AiOutlineCloudUpload } from 'react-icons/ai';

import {
  ModalContainer,
  ModalContainerProps,
} from '@/components/common/ui/modal-container';
import { ActionButton } from '@/components/common/ui/button';
import { Gallery } from './gallery';

type OnChange = ChangeEventHandler<HTMLInputElement>;

export type ImageSelectionResult = { src: string; altText: string };

interface Props extends Omit<ModalContainerProps, 'children'> {
  onFileSelect: (image: File) => void;
  onImageSelect: (result: ImageSelectionResult) => void;
  images: { src: string }[];
  uploading?: boolean;
}

const GalleryModal: FC<Props> = ({
  visible,
  images,
  uploading = false,
  onClose,
  onFileSelect,
  onImageSelect,
}) => {
  const [selectedImage, setSelectedImage] = useState('');
  const [altText, setAltText] = useState('');

  const handleImageChange: OnChange = e => {
    const image = Array.from(e.target.files!)[0];

    if (!image.type.startsWith('image')) return;

    onFileSelect(image);
  };

  const handleSubmit = () => {
    if (!selectedImage) return;

    onImageSelect({ src: selectedImage, altText });
    onClose && onClose();
  };

  return (
    <ModalContainer onClose={onClose} visible={visible}>
      <div className="h-[465px] w-[700px] rounded bg-primary-dark p-2 dark:bg-primary">
        <div className="flex">
          <div className="custom-scrollbar max-h-[450px] basis-3/4 overflow-y-auto">
            <Gallery
              images={images}
              onSelect={src => setSelectedImage(src)}
              selectedImage={selectedImage}
              uploading={uploading}
            />
          </div>

          <div className="basis-1/4 px-2">
            <div className="space-y-4">
              <div>
                <input
                  onChange={handleImageChange}
                  hidden
                  type="file"
                  id="image-input"
                  accept="image/*"
                />
                <label htmlFor="image-input">
                  <div className="flex w-full cursor-pointer items-center justify-center space-x-2 rounded border-2 border-action p-2 text-action">
                    <AiOutlineCloudUpload />
                    <span>Upload Image</span>
                  </div>
                </label>
              </div>

              {selectedImage && (
                <>
                  <textarea
                    className="h-32 w-full resize-none rounded border-2 border-secondary-dark bg-transparent p-1 text-primary focus:ring-1 dark:text-primary-dark"
                    placeholder="Alt Text"
                    value={altText}
                    onChange={({ target: { value } }) => setAltText(value)}
                  />

                  <ActionButton title="Select" onClick={handleSubmit} />

                  <div className="relative aspect-video bg-png-pattern">
                    <Image
                      fill
                      sizes="200px"
                      src={selectedImage}
                      alt="gallery-image"
                      className="object-contain"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};

export { GalleryModal };
