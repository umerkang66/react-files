import { useEffect } from 'react';
import ReactDOM from 'react-dom';

export default function Modal({ children, actionBar, onClose }) {
  useEffect(() => {
    // this is to remove the scrollbar from document.
    document.body.classList.add('overflow-hidden');

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  const jsx = (
    <div>
      <div onClick={onClose} className="fixed inset-0 bg-gray-300 opacity-80" />
      <div className="fixed inset-40 p-10 bg-white">
        <div className="flex flex-col justify-between h-full">
          {children}
          <div className="flex justify-end">{actionBar}</div>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(jsx, document.getElementById('modal'));
}
