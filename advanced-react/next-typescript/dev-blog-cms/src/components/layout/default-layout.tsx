import { type FC, PropsWithChildren } from 'react';
import { AppHead } from '../common/app-head';
import { UserNav } from '../common/ui/nav/user-nav';

type Props = { title?: string; desc?: string } & PropsWithChildren;

const DefaultLayout: FC<Props> = ({ children, title, desc }) => {
  return (
    <>
      <AppHead title={title} desc={desc} />
      <div className="min-h-screen bg-primary transition dark:bg-primary-dark">
        <UserNav />

        <div className="mx-auto max-w-4xl">{children}</div>
      </div>
    </>
  );
};

export { DefaultLayout };
