import BookList from '../components/BookList';
import BookForm from '../components/BookForm';
import { requireAuth } from '../hocs/requireAuth';

function Home() {
  return (
    <div>
      <BookList />
      <BookForm />
    </div>
  );
}

export default requireAuth(Home);
