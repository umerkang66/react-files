import Head from 'next/head';
import { type FC } from 'react';

type Props = { title?: string; desc?: string };

export const APP_NAME = 'Dev Blogs Cms';

const AppHead: FC<Props> = ({ title, desc }) => {
  return (
    <Head>
      <title>{title ? title + ' | ' + APP_NAME : APP_NAME}</title>
      {desc && <meta name="description" content={desc} />}
    </Head>
  );
};

export { AppHead };
