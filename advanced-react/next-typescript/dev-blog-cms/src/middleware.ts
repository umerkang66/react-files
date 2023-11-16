import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    // navigate our user to the same page
    // otherwise through 'authorized' function
    // this will go to signIn page
    NextResponse.rewrite(new URL(req.url));
  },
  {
    callbacks: {
      // this token is updated in [...nextAuth]
      authorized({ token }) {
        // if we return true from here, upper 'middleware' function will come to an action
        return token?.role === 'admin';
      },
    },
    secret: process.env.JWT_SECRET!,
  },
);

export const config = {
  // whenever we want to go to these routes, upper function will decide, if this route should be accessed or redirected.
  matcher: ['/admin/:path*'],
};
