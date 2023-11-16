import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';
import type { AppType } from 'next/app';
import NextNProgress from 'nextjs-progressbar';

import '../styles/globals.css';

interface PageProps {
  session?: Session | null;
}

const App: AppType<PageProps> = ({ Component, pageProps }) => {
  return (
    <SessionProvider session={pageProps.session}>
      <NextNProgress options={{ showSpinner: false }} />
      <Toaster />
      <main>
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
};

export default App;
