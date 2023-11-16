import { FETCH_COMMENTS, SAVE_COMMENTS } from 'actions/types';

const getNameData = comments => comments.map(comment => comment.name);

const commentsReducer = (state = [], action) => {
  switch (action.type) {
    case SAVE_COMMENTS:
      return [...state, action.payload];
    case FETCH_COMMENTS:
      return [...state, ...getNameData(action.payload.data)];
    default:
      return state;
  }
};

export default commentsReducer;
