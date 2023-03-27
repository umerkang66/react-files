import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useMutation } from './useMutation';

function addDocumentFn(collectionName, data) {
  const collectionRef = collection(db, collectionName);

  return addDoc(collectionRef, data);
}

function useAddDocument() {
  const { mutate, loading, error } = useMutation(addDocumentFn);

  return { addDocument: mutate, loading, error };
}

export { useAddDocument };
