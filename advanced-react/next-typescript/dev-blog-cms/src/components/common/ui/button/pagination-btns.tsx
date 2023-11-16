import { type FC } from 'react';
import { BiLoader } from 'react-icons/bi';

type Props = {
  onNext?: () => void;
  onPrev?: () => void;
  disablePrev?: boolean;
  disableNext?: boolean;
  loading?: boolean;
};

const PaginationBtns: FC<Props> = props => {
  const { disableNext, disablePrev, onNext, onPrev, loading } = props;

  return (
    <div className="flex items-center space-x-2">
      {loading && (
        <BiLoader
          className="animate-spin text-secondary-dark dark:text-secondary-light"
          size={20}
        />
      )}
      <button
        onClick={onPrev}
        disabled={disablePrev}
        className="bg-secondary-light px-2 py-1 text-primary-dark disabled:opacity-50 dark:bg-secondary-dark dark:text-primary"
      >
        Prev
      </button>
      <button
        onClick={onNext}
        disabled={disableNext}
        className="bg-secondary-light px-2 py-1 text-primary-dark disabled:opacity-50 dark:bg-secondary-dark dark:text-primary"
      >
        Next
      </button>
    </div>
  );
};

export { PaginationBtns };
