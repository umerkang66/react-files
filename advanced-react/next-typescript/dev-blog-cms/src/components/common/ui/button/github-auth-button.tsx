import classNames from 'classnames';
import { signIn } from 'next-auth/react';
import { useCallback, type FC } from 'react';
import { AiFillGithub } from 'react-icons/ai';

type Props = { lightOnly?: boolean };

const GithubAuthButton: FC<Props> = ({ lightOnly }) => {
  const getColors = useCallback(() => {
    return lightOnly
      ? 'text-primary-dark bg-primary'
      : 'bg-primary-dark text-primary dark:bg-primary dark:text-primary-dark';
  }, [lightOnly]);

  return (
    <button
      className={classNames(
        'flex items-center justify-center space-x-1 rounded px-3 py-2 transition duration-100 hover:scale-[0.97]',
        getColors(),
      )}
      onClick={() => signIn('github')}
    >
      <div className="inline-block">Continue With</div>
      <AiFillGithub size={24} />
    </button>
  );
};

export { GithubAuthButton };
