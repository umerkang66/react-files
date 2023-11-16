import { Router } from 'express';
import { me, signin, signout, signup } from '../controllers/user';
import { currentUser, requireAuth } from '../middlewares';
import { getMyPosts } from '../controllers/post';

const router = Router();

router.post('/signup', signup);
router.post('/signin', signin);

const authMiddlewares = [currentUser, requireAuth];

router.get('/signout', authMiddlewares, signout);

router.get('/me', authMiddlewares, me);
router.get('/me/posts', authMiddlewares, getMyPosts);

export { router as userRouter };
