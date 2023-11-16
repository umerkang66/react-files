import path from 'path';
import express from 'express';
import ws from 'ws';

import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { applyWSSHandler } from '@trpc/server/adapters/ws';

import { appRouter } from './routers';
import { createContext } from './trpc/context';

async function start() {
  const app = express();

  app.use(
    '/trpc',
    createExpressMiddleware({ router: appRouter, createContext })
  );

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(process.cwd(), 'client', 'dist')));

    app.get('*', (_, res) => {
      res.sendFile(path.join(process.cwd(), 'client', 'dist', 'index.html'));
    });
  }

  const server = app.listen(3000, () =>
    console.log('App is listening on port 3000')
  );

  applyWSSHandler({
    wss: new ws.Server({ server }),
    router: appRouter,
    createContext,
  });
}

start();

export type AppRouter = typeof appRouter;
