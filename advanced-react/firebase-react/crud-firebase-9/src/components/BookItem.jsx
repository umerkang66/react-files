import { useDeleteDoc } from '../hooks/useDeleteDoc';

function BookItem({ book }) {
  const { deleteDoc: deleteBook, loading } = useDeleteDoc();

  return (
    <li style={{ padding: '0' }}>
      <button
        disabled={loading}
        onClick={() => deleteBook('books', book.id)}
        style={{
          cursor: 'pointer',
          height: '100%',
          width: '100%',
          textAlign: 'start',
          backgroundColor: `${loading ? '#772eff' : 'transparent'}`,
          color: `${loading ? 'white' : '#333'}`,
          padding: '20px',
        }}
      >
        {book.title} {loading && '--> Deleting...'}
      </button>
    </li>
  );
}

export default BookItem;
