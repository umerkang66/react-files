import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useMutation } from './useMutation';

function deleteDocFn(collectionName, docId) {
  // third argument is the id of the document
  return deleteDoc(doc(db, collectionName, docId));
}

function useDeleteDoc() {
  const { mutate, loading, error } = useMutation(deleteDocFn);

  return { deleteDoc: mutate, loading, error };
}

export { useDeleteDoc };
