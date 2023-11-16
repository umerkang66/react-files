import { connectToDb } from '@/lib/db';
import { createProfile, createTokenWithUserId } from '@/lib/next-auth-utils';
import { User } from '@/models';
import { type AuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import GithubProvider from 'next-auth/providers/github';

export const authOptions: AuthOptions = {
  session: { strategy: 'jwt' },
  secret: process.env.JWT_SECRET!,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      async profile(profile, tokens) {
        const { name, login, email, avatar_url } = profile;

        // find the user in db
        await connectToDb();

        const previousUser = await User.findOne({ email });

        const userFromGithub = {
          name: name || login,
          email,
          avatar: avatar_url,
        };

        if (
          previousUser &&
          (userFromGithub.name !== previousUser.name ||
            userFromGithub.email !== previousUser.email ||
            userFromGithub.avatar !== previousUser.avatar)
        ) {
          // things might have been updated from the past
          await previousUser.updateOne(userFromGithub);
        }

        if (!previousUser) {
          const u: any = userFromGithub;

          if (u.email === process.env.ADMIN) u.role = 'admin';

          const user = await User.create(u);
          return createProfile(profile, user);
        }

        // this content will be provided to 'jwt' callback as 'user' property
        return createProfile(profile, previousUser);
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      // this will be called, when first time user is logged in.

      // 'profile' that is passed in this method is 'profile' that is returned from github api

      // this user is what that was returned from 'profile' method, if this is not the callback that is called on first signin, only token will be available

      // when this is called on 'useSession' or 'getSession' old token returned, new token is not created because user is not defined
      if (user) {
        return createTokenWithUserId(token, user);
      }

      return token;
    },
    async session({ session, token }) {
      // every time useSession is called
      await connectToDb();
      const sessionUser = await User.findById((token as any).userId);

      if (!sessionUser) throw new Error('User not found');

      session.user = sessionUser?.toJSON();
      return session;
    },
  },
  pages: { signIn: '/auth/signin', error: '/404' },
};

export default NextAuth(authOptions);
