import { useState } from 'react';
import { GoChevronLeft, GoChevronDown } from 'react-icons/go';

export default function Accordion({ items }) {
  const [expandedIndex, setExpandedIndex] = useState(0);

  const renderedContent = items.map((item, i) => {
    const isExpanded = expandedIndex === i;

    const icon = (
      <span className="text-xl">
        {isExpanded ? <GoChevronDown /> : <GoChevronLeft />}
      </span>
    );

    return (
      <div key={item.id}>
        <div
          className="flex justify-between p-3 bg-gray-50 border-b items-center cursor-pointer"
          onClick={() =>
            setExpandedIndex(prevState => (prevState === i ? -1 : i))
          }
        >
          {item.label}
          {icon}
        </div>
        {isExpanded && <div className="border-b p-5">{item.content}</div>}
      </div>
    );
  });

  return <div className="border-x border-t rounded">{renderedContent}</div>;
}
