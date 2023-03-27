export default (state = [], action) => {
  switch (action.type) {
    case 'FETCH_POSTS':
      return action.payload;
    default:
      return state;
  }

  // BAD
  // Never return undefined
  // When first rendered it returns the initial state that is passed as a first argument when it is invoked second time
  // Never touch value other thatn the state, or action. something like doing api request or dom manupulation is bad
  // Do not mutate the state, (strings, and numbers cannot be mutated)
  // MISLEADING: FALSE 4th argument
};
