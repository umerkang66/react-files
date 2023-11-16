import { type FC } from 'react';
import { ImSpinner3 } from 'react-icons/im';
import classNames from 'classnames';

import { ModalContainer, ModalContainerProps } from './modal-container';

interface Props extends ModalContainerProps {
  title: string;
  subTitle: string;
  danger?: boolean;
  busy?: boolean;
  onCancel?: () => void;
  onConfirm?: () => void;
}

const commonBtnClasses = 'rounded px-3 py-1 text-white';

const ConfirmModal: FC<Props> = ({
  title,
  subTitle,
  onCancel,
  onConfirm,
  onClose,
  visible,
  danger = false,
  busy = false,
}) => {
  const btnColors = [
    danger ? 'bg-blue-500' : 'bg-red-500',
    danger ? 'bg-red-500' : 'bg-blue-500',
  ];

  return (
    <ModalContainer onClose={onClose} visible={visible}>
      <div className="rounded bg-primary-dark p-3 dark:bg-primary">
        <p className="text-lg font-semibold text-primary dark:text-primary-dark">
          {title}
        </p>

        <p className="text-primary dark:text-primary-dark">{subTitle}</p>

        {busy && (
          <p className="mt-2 flex items-center space-x-2 text-primary dark:text-primary-dark">
            <ImSpinner3 className="animate-spin" />
            <span className="animate-pulse">Please wait...</span>
          </p>
        )}

        {!busy && (
          <div className="flex items-center space-x-2 pt-2">
            <button
              className={classNames(commonBtnClasses, btnColors[0])}
              onClick={onCancel}
              type="button"
              disabled={busy}
            >
              Cancel
            </button>
            <button
              className={classNames(commonBtnClasses, btnColors[1])}
              onClick={onConfirm}
              type="button"
              disabled={busy}
            >
              Confirm
            </button>
          </div>
        )}
      </div>
    </ModalContainer>
  );
};

export { ConfirmModal };
