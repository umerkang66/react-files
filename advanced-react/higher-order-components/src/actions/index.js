import axios from 'axios';
import { SAVE_COMMENTS, FETCH_COMMENTS, CHANGE_AUTH } from './types';

export const saveComment = comment => ({
  type: SAVE_COMMENTS,
  payload: comment,
});

export const fetchComments = () => {
  // This asynchronous action is handled by redux-promise
  const response = axios.get('https://jsonplaceholder.typicode.com/comments');

  return { type: FETCH_COMMENTS, payload: response };
};

export const changeAuth = isLoggedIn => ({
  type: CHANGE_AUTH,
  payload: isLoggedIn,
});
