import type { NextApiHandler } from 'next';
import { cloudinary } from '@/lib/cloudinary';
import { catchAsync, readForm, requireAdmin } from '@/lib/utils';

const folder_name = 'dev-blog-cms/blogs';
export const config = {
  api: { bodyParser: false },
};

const handler: NextApiHandler = (req, res) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      return getAllImages(req, res);

    case 'POST':
      return uploadNewImage(req, res);

    default:
      return res.status(404).send({
        error: [{ message: 'No Endpoint exists' }],
      });
  }
};

const getAllImages = catchAsync(async (req, res) => {
  await requireAdmin(req, res);

  const { resources } = await cloudinary.api.resources({
    resource_type: 'image',
    type: 'upload',
    prefix: folder_name,
  });

  const images = resources.map(({ secure_url }: any) => ({
    src: secure_url,
  }));

  res.send({ images });
});

const uploadNewImage = catchAsync(async (req, res) => {
  await requireAdmin(req, res);

  const { files } = await readForm(req);

  // this 'prop' will come from frontend
  const imageFile = files.image[0];

  const { secure_url } = await cloudinary.uploader.upload(imageFile.filepath, {
    folder: folder_name,
  });

  res.send({ src: secure_url });
});

export default handler;
