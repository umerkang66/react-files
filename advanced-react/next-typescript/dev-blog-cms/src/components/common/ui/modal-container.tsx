import ReactDOM from 'react-dom';
import { useCallback, type FC, type ReactNode, useId, useEffect } from 'react';

export type ModalContainerProps = {
  children?: ReactNode;
  visible?: boolean;
  onClose?(): void;
};

const ModalContainer: FC<ModalContainerProps> = ({
  visible,
  children,
  onClose,
}) => {
  const containerId = useId();

  // we are wrapping it inside the useCallback because we use it in inside the deps of useEffect
  const handleClose = useCallback(() => onClose && onClose(), [onClose]);

  const handleClick = (e: any) => {
    if (e.target.id !== containerId) return;

    handleClose();
  };

  useEffect(() => {
    const closeModal = ({ key }: KeyboardEvent) =>
      key === 'Escape' && handleClose();

    document.addEventListener('keydown', closeModal);

    return () => document.removeEventListener('keydown', closeModal);
  }, [handleClose]);

  const JSX = (
    <div
      id={containerId}
      onClick={handleClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-primary bg-opacity-5 backdrop-blur-[2px] dark:bg-primary-dark dark:bg-opacity-5"
    >
      {children}
    </div>
  );

  if (!visible) return null;

  return ReactDOM.createPortal(JSX, document.getElementById('modal')!);
};

export { ModalContainer };
