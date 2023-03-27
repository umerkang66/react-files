import tv4 from 'tv4';
import stateSchema from 'middlewares/schema/stateSchema';

// Documentation of redux-middlewares is in the async middleware in the middlewares directory
// In the object that is passed in the first function of middleware we get "dispatch" property as well as "getState" property
const stateValidator = ({ getState }) => {
  return next => action => {
    // We are not concerned with what happens to action before reaching the reducer, we only care after it hits the reducer, and the new state is created, that's why we have to immediately call next function with (action)
    next(action);

    // Here we can write our validation logic, because our action is gone through every step of redux store (all the middlewares, and passed the reducer, and new state is generated) because of the upper next function
    const state = getState();
    // tv4 library checks using json schema that is created jsonSchema.net
    const validState = tv4.validate(state, stateSchema);
    // Valid state returns boolean value
    if (!validState) {
      console.warn('Invalid state schema detected');
    }
  };
};

export default stateValidator;
