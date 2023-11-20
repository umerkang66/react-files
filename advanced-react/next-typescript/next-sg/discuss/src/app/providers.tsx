'use client';

import { NextUIProvider } from '@nextui-org/react';
import { SessionProvider } from 'next-auth/react';

interface Props {
  children: React.ReactNode;
}

function Providers(props: Props) {
  return (
    <SessionProvider>
      <NextUIProvider>{props.children}</NextUIProvider>
    </SessionProvider>
  );
}

export default Providers;
