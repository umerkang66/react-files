import { useEffect, useRef, useState } from 'react';
import { projectFirestore } from '../firebase/config';

const useFirestoreCollection = (collection, _query, _orderBy) => {
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const query = useRef(_query).current;
  const orderBy = useRef(_orderBy).current;

  useEffect(() => {
    setIsPending(true);

    let collectionRef = projectFirestore.collection(collection);

    if (query) {
      // property name, operator, value
      collectionRef = collectionRef.where(...query);
    }
    if (orderBy) {
      // property name, asc|desc
      collectionRef = collectionRef.orderBy(...orderBy);
    }

    // getting real time data by using snapshot
    const unsubscribe = collectionRef.onSnapshot(
      snapshot => {
        setError(null);
        if (snapshot.empty) {
          setError(`No ${collection} found`);
        }

        const docs = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

        setDocuments(docs);
        setIsPending(false);
      },
      error => {
        setError(error.message || 'Something went wrong');
        setIsPending(false);
      }
    );

    return () => unsubscribe();
    // this collection dep is not needed btw
  }, [collection, query, orderBy]);

  return { documents, error, isPending };
};

const useFirestoreDocument = (collection, docId) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    setIsPending(true);

    const collectionRef = projectFirestore.collection(collection);

    // getting real time data by using snapshot
    const unsubscribe = collectionRef.doc(docId).onSnapshot(
      snapshot => {
        if (!snapshot.exists) {
          setDocument(null);
          setIsPending(false);
          setError(
            `${collection.slice(
              0,
              collection.length - 1
            )} with this 'id' does not exist`
          );
          return;
        }

        setDocument(snapshot.data());
        setIsPending(false);
      },
      error => {
        setError(error.message || 'Something went wrong');
        setIsPending(false);
      }
    );

    return () => unsubscribe();
    // this collection dep is not needed btw
  }, [collection, docId]);

  return { document, error, isPending };
};

export { useFirestoreCollection, useFirestoreDocument };
