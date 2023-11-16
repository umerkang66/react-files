import { type FC } from 'react';
import { BsCheckLg } from 'react-icons/bs';

type Props = { visible: boolean };

const CheckMark: FC<Props> = ({ visible }) => {
  if (!visible) return null;

  return (
    <div className="rounded-full bg-action bg-opacity-70 p-2 text-primary backdrop-blur-sm">
      <BsCheckLg />
    </div>
  );
};

export { CheckMark };
