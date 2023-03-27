import classNames from 'classnames';

export default function Button({
  children,
  primary,
  secondary,
  success,
  warning,
  danger,
  outline,
  rounded,
  className,
  ...rest
}) {
  const classes = classNames(className, 'px-3 py-1 border flex items-center', {
    'border-blue-600 bg-blue-600 text-white': primary,
    'border-gray-600 bg-gray-600 text-white': secondary,
    'border-green-600 bg-green-600 text-white': success,
    'border-yellow-600 bg-yellow-600 text-white': warning,
    'border-red-600 bg-red-600 text-white': danger,

    'rounded-full': rounded,
    'bg-transparent': outline,
    'text-blue-700': outline && primary,
    'text-gray-700': outline && secondary,
    'text-green-700': outline && success,
    'text-yellow-700': outline && warning,
    'text-red-700': outline && danger,
  });

  return (
    <button {...rest} className={classes}>
      {children}
    </button>
  );
}

Button.propTypes = {
  checkVariationValue: ({ primary, secondary, success, warning, danger }) => {
    const count =
      Number(!!primary) +
      Number(!!secondary) +
      Number(!!success) +
      Number(!!warning) +
      Number(!!danger);

    if (count > 1) {
      return new Error(
        'Only one of primary, secondary, success, warning, danger can be true'
      );
    }
  },
};
