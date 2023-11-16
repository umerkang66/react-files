import { useRealtimeSnapshot } from '../hooks/useRealtimeSnapshot';
import { useCurrentUserContext } from '../hooks/useCurrentUserContext';
import BookItem from './BookItem';

function BookList() {
  // we don't have to worry about user being null, because if it is, this component will not be shown
  const { user } = useCurrentUserContext();
  const {
    data: books,
    loading,
    error,
  } = useRealtimeSnapshot('books', ['uid', '==', user.uid]);

  return (
    <div className="book-list">
      {loading ? (
        'Loading...'
      ) : (
        <ul>
          {books && books.map(book => <BookItem book={book} key={book.id} />)}
        </ul>
      )}
      {error && <div>{error}</div>}
    </div>
  );
}

export default BookList;
