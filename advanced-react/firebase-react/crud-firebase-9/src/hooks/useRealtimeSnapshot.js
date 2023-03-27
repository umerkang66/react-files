import { useEffect, useRef, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase/config';

function useRealtimeSnapshot(collectionName, _q) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const q = useRef(_q).current;

  useEffect(() => {
    setLoading(true);
    let collectionRef = collection(db, collectionName);

    if (q) {
      collectionRef = query(collectionRef, where(...q));
    }

    const unsubscribe = onSnapshot(
      collectionRef,
      snapshot => {
        setData(
          snapshot.docs.map(docSnap => ({ ...docSnap.data(), id: docSnap.id }))
        );
        setLoading(false);
      },
      error => {
        setError(error.message || 'Something went wrong');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [collectionName, q]);

  return { data, loading, error };
}

export { useRealtimeSnapshot };
