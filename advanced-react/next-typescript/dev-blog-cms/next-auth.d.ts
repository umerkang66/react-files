import { IUser } from '@/types';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user?: IUser;
  }
}
