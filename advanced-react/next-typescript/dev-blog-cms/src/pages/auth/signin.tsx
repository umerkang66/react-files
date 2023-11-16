import { type NextPage } from 'next';

import { GithubAuthButton } from '@/components/common/ui/button';
import { DefaultLayout } from '@/components/layout/default-layout';

type Props = {};

const Signin: NextPage<Props> = () => {
  return (
    <DefaultLayout>
      <div className="flex h-screen items-center justify-center bg-primary dark:bg-primary-dark">
        <GithubAuthButton />
      </div>
    </DefaultLayout>
  );
};

export default Signin;
