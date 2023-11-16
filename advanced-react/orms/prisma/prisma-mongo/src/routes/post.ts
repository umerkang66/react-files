import { Router } from 'express';
import {
  allPosts,
  createPost,
  deletePost,
  updatePost,
} from '../controllers/post';
import { currentUser, requireAuth } from '../middlewares';

const router = Router();

const authMiddlewares = [currentUser, requireAuth];

router.route('/').get(allPosts).post(authMiddlewares, createPost);

router
  .route('/:id')
  .patch(authMiddlewares, updatePost)
  .delete(authMiddlewares, deletePost);

export { router as postRouter };
