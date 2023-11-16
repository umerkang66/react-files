import { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import { CreateWSSContextFnOptions } from '@trpc/server/adapters/ws';

export const createContext = ({
  req,
  res,
}: CreateExpressContextOptions | CreateWSSContextFnOptions) => {
  // this is where we can check if user is logged in or admin, like using getServerSession in next js

  return { isAdmin: true, req, res };
};
