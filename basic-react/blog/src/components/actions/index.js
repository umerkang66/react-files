import _ from 'lodash';
import jsonPlaceholder from '../../apis/jsonPlaceholder.js';

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  // When we call an action creator inside of an action creator we need to make sure that we dispatch that action creator
  await dispatch(fetchPosts());

  const userIds = _.uniq(_.map(getState().posts, 'userId'));
  userIds.forEach(userId => dispatch(fetchUser(userId)));
};

// HELPER FUNCTION
const fetchGenericData = async toBeFetched => {
  try {
    const response = await jsonPlaceholder.get(`/${toBeFetched}`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

// It can have type property, and optionally payload
// Now we are managing the code for redux-thunk property
export const fetchPosts = () => async dispatch => {
  try {
    const data = await fetchGenericData('posts');
    dispatch({ type: 'FETCH_POSTS', payload: data });
  } catch (err) {
    console.error(err);
  }
};

export const fetchUser = id => async dispatch => {
  try {
    const data = await jsonPlaceholder.get(`users/${id}`);
    dispatch({ type: 'FETCH_USER', payload: data });
  } catch (err) {
    console.error(err);
  }
};

/*
const _fetchUser = _.memoize(async function (id, dispatch) {
  try {
    const data = await jsonPlaceholder.get(`users/${id}`);

    dispatch({ type: 'FETCH_USER', payload: data });
  } catch (err) {
    console.error(err);
  }
});
*/
