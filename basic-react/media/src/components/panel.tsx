import classNames from 'classnames';
import { FC, PropsWithChildren } from 'react';

interface Props {
  className: string;
  [key: string]: any;
}

const Panel: FC<PropsWithChildren<Props>> = ({
  children,
  className,
  ...rest
}) => {
  const finalClassNames = classNames(
    'border rounded p-3 shadow bg-white w-full',
    className
  );

  return (
    <div {...rest} className={finalClassNames}>
      {children}
    </div>
  );
};

export default Panel;
