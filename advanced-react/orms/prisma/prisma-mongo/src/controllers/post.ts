import { prisma } from '../../prisma';
import { catchAsync } from '../utils';
import { validateCreatePost, validateUpdatePost } from '../validators/post';

export const createPost = catchAsync(async (req, res) => {
  const body = validateCreatePost(req.body);

  const post = await prisma.post.create({
    data: { ...body, author: { connect: { id: req.user!.id } } },
  });

  res.status(201).send({ post });
});

export const updatePost = catchAsync<{ id: string }>(async (req, res) => {
  const body = validateUpdatePost(req.body);

  const post = await prisma.post.update({
    where: { id: req.params.id as string },
    data: { ...body },
  });

  if (!post) throw new Error('404 - Post not found');

  res.send({ post });
});

export const deletePost = catchAsync<{ id: string }>(async (req, res) => {
  await prisma.post.delete({ where: { id: req.params.id } });

  res.send(null);
});

export const allPosts = catchAsync(async (req, res) => {
  const posts = await prisma.post.findMany();
  res.send({ posts });
});

export const getMyPosts = catchAsync(async (req, res) => {
  const posts = await prisma.post.findMany({
    where: { authorId: req.user!.id },
  });

  res.send({ posts });
});
