import { useState } from 'react';
import { useAddDocument } from '../hooks/useAddDocument';
import { useCurrentUserContext } from '../hooks/useCurrentUserContext';

function BookForm() {
  const [newBook, setNewBook] = useState('');
  const { addDocument: addBook, loading, error } = useAddDocument();
  // we don't have to worry about user being null, because if it is, this component will not be shown
  const { user } = useCurrentUserContext();

  const handleSubmit = async e => {
    e.preventDefault();
    await addBook('books', { title: newBook, uid: user.uid });
    setNewBook('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <span>Add a new book title:</span>
        <input
          required
          type="text"
          onChange={e => setNewBook(e.target.value)}
          value={newBook}
        />
      </label>
      <button disabled={loading}>{loading ? 'Adding...' : 'Add'}</button>
      {error && error.toString()}
    </form>
  );
}

export default BookForm;
