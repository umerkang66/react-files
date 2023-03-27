import produce from 'immer';

const actionTypes = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  ADD: 'ADD',
  VAL_CHANGE: 'VAL_CHANGE',
};

const reducer = produce((state, action) => {
  switch (action.type) {
    // count
    case actionTypes.INCREMENT:
      state.count += 1;
      return;
    case actionTypes.DECREMENT:
      state.count -= 1;
      return;
    case actionTypes.ADD:
      state.count += action.payload;
      state.value = '';
      return;
    // value
    case actionTypes.VAL_CHANGE:
      state.value = action.payload;
      return;
    default:
      return;
  }
});

// ACTIONS
// count
const increment = () => ({ type: actionTypes.INCREMENT });
const decrement = () => ({ type: actionTypes.DECREMENT });
const addValue = value => ({ type: actionTypes.ADD, payload: value });
// value
const changeVal = value => ({ type: actionTypes.VAL_CHANGE, payload: value });

export const actions = {
  increment,
  decrement,
  addValue,
  changeVal,
};

export default reducer;
