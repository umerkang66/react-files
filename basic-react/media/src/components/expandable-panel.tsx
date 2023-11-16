import { FC, ReactNode, useState } from 'react';
import { GoChevronLeft, GoChevronDown } from 'react-icons/go';

interface Props {
  header: ReactNode;
  children: ReactNode;
  className?: string;
}

const ExpandablePanel: FC<Props> = ({ header, children, className }) => {
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    setExpanded(prevValue => !prevValue);
  };

  return (
    <div className={`${'mb-2 border rounded'} ${className}`}>
      <div className="flex p-2 justify-between items-center">
        <div className="flex flex-row items-center justify-between">
          {header}
        </div>
        <div onClick={handleClick} className="cursor-pointer p-2">
          {expanded ? <GoChevronDown /> : <GoChevronLeft />}
        </div>
      </div>
      {expanded && <div className="p-2 border-t">{children}</div>}
    </div>
  );
};

export default ExpandablePanel;
