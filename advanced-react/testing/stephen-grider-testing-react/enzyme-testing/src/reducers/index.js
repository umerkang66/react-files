import { combineReducers } from 'redux';
import commentsReducer from 'reducers/comments';

const reducers = combineReducers({
  comments: commentsReducer,
});

export default reducers;
