import { FC, PropsWithChildren } from 'react';
import classNames from 'classnames';
import { ImSpinner8 } from 'react-icons/im';

interface Props {
  className?: string;
  primary?: boolean;
  secondary?: boolean;
  success?: boolean;
  warning?: boolean;
  danger?: boolean;
  outline?: boolean;
  rounded?: boolean;
  loading?: boolean;
  [key: string]: any;
}

const Button: FC<PropsWithChildren<Props>> = ({
  children,
  className,
  primary,
  secondary,
  success,
  warning,
  danger,
  outline,
  rounded,
  loading,
  ...rest
}) => {
  const count =
    Number(!!primary) +
    Number(!!secondary) +
    Number(!!warning) +
    Number(!!success) +
    Number(!!danger);

  if (count > 1) {
    console.warn(
      'Only one of primary, secondary, success, warning, danger can be true'
    );
    return null;
  }

  const classes = classNames(
    className,
    'flex items-center justify-center px-3 py-1.5 border h-8',
    {
      'opacity-80': loading,
      'border-blue-500 bg-blue-500 text-white': primary,
      'border-gray-900 bg-gray-900 text-white': secondary,
      'border-green-500 bg-green-500 text-white': success,
      'border-yellow-400 bg-yellow-400 text-white': warning,
      'border-red-500 bg-red-500 text-white': danger,
      'rounded-full': rounded,
      'bg-white': outline,
      'text-blue-500': outline && primary,
      'text-gray-900': outline && secondary,
      'text-green-500': outline && success,
      'text-yellow-400': outline && warning,
      'text-red-500': outline && danger,
    }
  );

  return (
    <button disabled={loading} {...rest} className={classes}>
      {loading ? <ImSpinner8 className="animate-spin" /> : children}
    </button>
  );
};

export default Button;
