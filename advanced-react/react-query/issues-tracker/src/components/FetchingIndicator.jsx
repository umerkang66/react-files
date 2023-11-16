import { useIsFetching } from '@tanstack/react-query';
import { Loader } from './Loader';

export function FetchingIndicator() {
  const isFetching = useIsFetching();

  if (!isFetching) {
    return null;
  }

  return (
    <div className="fetching-indicator">
      <Loader />
    </div>
  );
}
