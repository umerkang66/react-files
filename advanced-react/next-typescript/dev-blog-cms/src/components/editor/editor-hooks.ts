import { useFetch } from '@/hooks/use-fetch';
import { useMutation } from '@/hooks/use-mutation';

type Image = { src: string };

export function useImages() {
  const { data, updateData: updateImages } = useFetch<{ images: Image[] }>({
    key: 'images/fetch',
    url: '/api/image',
    defaultValue: { images: [] },
  });

  return { images: data.images, updateImages };
}

export function useImageUpload() {
  const { mutateData, mutating } = useMutation<Image | null>({
    url: '/api/image',
    defaultValue: null,
    method: 'post',
  });

  const uploadImage = (image: File) => {
    const formData = new FormData();
    // this 'image' is also same in the api
    formData.append('image', image);

    return mutateData(formData);
  };

  return { uploadImage, isUploading: mutating };
}
