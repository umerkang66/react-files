import { FC, Fragment } from 'react';
import classNames from 'classnames';

interface Props {
  times: number;
  className?: string;
}

const Skeleton: FC<Props> = ({ times, className }) => {
  const outerClassNames = classNames(
    'relative',
    'overflow-hidden',
    'bg-gray-200',
    'rounded',
    'mb-2.5',
    className
  );
  const innerClassNames = classNames(
    'animate-shimmer',
    'absolute',
    'inset-0',
    '-translate-x-full',
    'bg-gradient-to-r',
    'from-gray-200',
    'via-white',
    'to-gray-200'
  );

  const renderedBoxes = Array(times)
    .fill(0)
    .map((_, i) => {
      return (
        <div className={outerClassNames} key={i}>
          <div className={innerClassNames} />
        </div>
      );
    });

  return <Fragment>{renderedBoxes}</Fragment>;
};

export default Skeleton;
