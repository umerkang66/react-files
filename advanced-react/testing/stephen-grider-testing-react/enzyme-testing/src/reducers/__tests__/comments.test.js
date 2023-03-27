import commentsReducer from 'reducers/comments';
import { SAVE_COMMENTS } from 'actions/types';

it('handles actions of type SAVE_COMMENT', () => {
  const newComment = 'New Comment';

  // Mocking the behavior of action-creators
  const action = {
    type: SAVE_COMMENTS,
    payload: newComment,
  };

  // Passing the action to the reducer, that returns state
  const newState = commentsReducer([], action);

  // Checking if newState is an array and contains newComment
  expect(newState).toEqual([newComment]);
});

it('handles action with unknown type', () => {
  // To test for the unknown types, we have to pass the action that has the unknown type (It could be anythings other than the types that are specified in commentsReducer)
  const newState = commentsReducer([], { type: 'DFKFJDKFJDKJ' });
  expect(newState).toEqual([]);
});
