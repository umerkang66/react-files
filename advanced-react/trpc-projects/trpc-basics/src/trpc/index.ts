import { TRPCError, inferAsyncReturnType, initTRPC } from '@trpc/server';
import { createContext } from './context';

const t = initTRPC
  .context<inferAsyncReturnType<typeof createContext>>()
  .create();

export const router = t.router;
export const publicProcedure = t.procedure;

const isAdminMiddleware = t.middleware(({ ctx, next }) => {
  if (!ctx.isAdmin) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return next({ ctx: { user: { id: new Date().toString() } } });
});

export const adminProcedure = t.procedure.use(isAdminMiddleware);
