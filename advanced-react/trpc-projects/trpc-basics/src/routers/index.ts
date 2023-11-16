import { router } from '../trpc';
import { userRouter } from './users';

export const appRouter = router({
  user: userRouter,
});
