import { useState, useEffect, useRef } from 'react';
import { GoChevronDown } from 'react-icons/go';
import Panel from './panel';

export default function Dropdown({ options, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const listener = e => {
      if (!dropdownRef.current) {
        return;
      }
      if (!dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    // performance.now()
    document.addEventListener('click', listener, true);

    return () => {
      document.removeEventListener('click', listener, true);
    };
  }, []);

  const renderedOptions = options.map(option => {
    return (
      <div
        className="hover:bg-sky-100 rounded cursor-pointer p-1"
        onClick={() => onChange(option)}
        key={option.value}
      >
        {option.label}
      </div>
    );
  });

  return (
    <div
      ref={dropdownRef}
      className="w-48 relative"
      onClick={() => setIsOpen(currentState => !currentState)}
    >
      <Panel className="flex justify-between items-center cursor-pointer">
        {value?.label || 'Select...'}
        <GoChevronDown />
      </Panel>
      {isOpen && <Panel className="absolute top-full">{renderedOptions}</Panel>}
    </div>
  );
}
