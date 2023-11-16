import { z } from 'zod';
import { adminProcedure, publicProcedure, router } from '../trpc';
import { observable } from '@trpc/server/observable';
import { EventEmitter } from 'stream';

const userProcedure = publicProcedure.input(z.object({ userId: z.string() }));
const eventEmitter = new EventEmitter();

export const userRouter = router({
  get: userProcedure.query(({ input }) => {
    return { id: input, name: 'Umer' };
  }),
  update: userProcedure
    .input(z.object({ name: z.string() }))
    .mutation(({ input, ctx }) => {
      const msg = `Updating user: ${input.userId}, to have the name: ${input.name}`;

      eventEmitter.emit('update', input.name + ' - ' + input.userId);

      return { msg };
    }),
  getAll: adminProcedure.query(({ ctx }) => {
    console.log(ctx.user);
    return { secretData: 'Secret Data' };
  }),
  onUpdate: publicProcedure.subscription(() => {
    return observable<string>(omit => {
      eventEmitter.on('update', omit.next);

      // close the connection
      return () => {
        eventEmitter.off('update', omit.next);
      };
    });
  }),
});
