import { useReducer, useEffect, useState } from 'react';
import { projectFirestore, timestamp } from '../firebase/config';

const initialState = {
  // this 'document' is not used, because we are listening to the real-time data
  document: null,
  isPending: false,
  error: null,
  success: false,
};

const types = {
  IS_PENDING: 'IS_PENDING',
  ADD_DOCUMENT: 'ADD_DOCUMENT',
  ERROR: 'ERROR',
  DELETE_DOCUMENT: 'DELETE_DOCUMENT',
};
const firestoreReducer = (state, action) => {
  switch (action.type) {
    case types.IS_PENDING:
      return {
        ...state,
        isPending: true,
        error: null,
        document: null,
        success: false,
      };
    case types.ADD_DOCUMENT:
      return {
        ...state,
        isPending: false,
        document: action.payload,
        success: true,
      };
    case types.DELETE_DOCUMENT:
      return {
        ...state,
        isPending: false,
        document: null,
        success: true,
      };
    case types.ERROR:
      return {
        ...state,
        isPending: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const dispatchIfNotCanceled = (dispatch, action, isCanceled) => {
  if (!isCanceled) {
    dispatch(action);
  }
};

export const useFirestoreMutation = collection => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCanceled, setIsCanceled] = useState(false);

  const ref = projectFirestore.collection(collection);

  const addDocument = async doc => {
    dispatch({ type: types.IS_PENDING });

    try {
      const createdAt = timestamp.fromDate(new Date());
      const addedDocument = await ref.add({ ...doc, createdAt });

      dispatchIfNotCanceled(
        dispatch,
        { type: types.ADD_DOCUMENT, payload: addedDocument },
        isCanceled
      );
    } catch (err) {
      dispatchIfNotCanceled(
        dispatch,
        { type: types.ERROR, payload: err?.message },
        isCanceled
      );
    }
  };

  const deleteDocument = async docId => {
    dispatch({ type: types.IS_PENDING });

    try {
      await ref.doc(docId).delete();

      dispatchIfNotCanceled(
        dispatch,
        { type: types.DELETE_DOCUMENT },
        isCanceled
      );
    } catch (err) {
      dispatchIfNotCanceled(
        dispatch,
        { type: types.ERROR, payload: err?.message },
        isCanceled
      );
    }
  };

  useEffect(() => {
    setIsCanceled(false);
    return () => setIsCanceled(true);
  }, []);

  return {
    addDocument,
    deleteDocument,
    response,
  };
};
