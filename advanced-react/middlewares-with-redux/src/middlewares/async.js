// Middleware Functions: We always to write three functions, one return the other that is below from it, the first function will receive an object that contains "dispatch" property, the second one is called with "next" function and the third one is called with the actual "action" object (note: its an action object return from acton function, because we have already dispatched the action and called it before its reaching the middleware) from action function
// Dispatch function: It actually calls the action, pass the action middlewares, and ultimately send the returned action (action object) to the state

const async = ({ dispatch }) => {
  return next => action => {
    // Check if the action has a payload property, If it does then wait for it to resolve, if it doesn't send the action to the next middleware

    // We can check if the function is a promise or not by checking if it has a "then" method on it. It it has it is a Promise
    if (!action.payload || !action.payload.then) {
      // if it is not a promise return to the next middleware, and return it so that the next code doesn't execute
      return next(action);
    }

    // We want to wait for the promise to resolve (get its data!!) and then create a new action with that data and dispatch it
    action.payload.then(res => {
      const newAction = { ...action, payload: res };
      // Dispatch is going to take this action and send to all the middlewares and eventually to the reducer
      // Actions that should be dispatched always must be objects (not functions, if these are functions, they should be called before dispatching, and should always return objects)
      dispatch(newAction);
    });
  };
};

export default async;
