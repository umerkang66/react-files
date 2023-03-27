import BookShow from './BookShow';
import useBooksContext from '../hooks/use-books-context';

export default function BookList() {
  const { books } = useBooksContext();

  return (
    <div className="book-list">
      {books.map(book => (
        <BookShow key={book.id} book={book} />
      ))}
    </div>
  );
}
