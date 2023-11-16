import { FC, ReactNode, useState } from 'react';

export type DropdownOption = { label: string; onClick?: () => void };

type Props = {
  options: DropdownOption[];
  head: ReactNode;
};

const Dropdown: FC<Props> = ({ head, options }) => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <button
      onBlur={() => setShowOptions(false)}
      onClick={() => setShowOptions(prev => !prev)}
      className="relative"
    >
      {head}
      {showOptions && (
        <div className="absolute right-2 top-full z-40 mt-4 min-w-max rounded border-2 border-primary-dark bg-primary text-left dark:border-primary dark:bg-primary-dark">
          <ul className="space-y-3 p-3">
            {options.map(({ label, onClick }, i) => (
              <li
                className="text-primary-dark dark:text-primary"
                key={label + i}
                onClick={onClick}
              >
                {label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </button>
  );
};

export { Dropdown };
