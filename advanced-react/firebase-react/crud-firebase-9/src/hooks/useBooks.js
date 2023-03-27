import { collection, getDocs } from 'firebase/firestore';

import { db } from '../firebase/config';
import { useQuery } from './useQuery';

async function getBooksFn() {
  const collectionRef = collection(db, 'books');
  const booksSnapshot = await getDocs(collectionRef);

  return booksSnapshot.docs.map(docSnap => ({
    ...docSnap.data(),
    id: docSnap.id,
  }));
}

// currently this is not being used, because realtimeSnapshot hook is used
export function useBooks() {
  const { data = [], loading, error, mutate } = useQuery('books', getBooksFn);

  return { books: data, loading, error, mutate };
}
