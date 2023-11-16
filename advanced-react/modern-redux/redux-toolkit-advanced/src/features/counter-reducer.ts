import { createAction, createReducer } from '@reduxjs/toolkit';

const increment = createAction('increment', (amount: number) => {
  return { payload: amount };
});

const decrement = createAction('decrement', (amount: number) => {
  return { payload: amount };
});

const reset = createAction('reset');

// reducer without slice
export const counterReducer = createReducer({ count: 0 }, (builder) => {
  builder.addCase(increment, (state, action) => {
    state.count += action.payload;
  });

  builder.addCase(decrement, (state, action) => {
    state.count -= action.payload;
  });

  builder.addCase(reset, (state, action) => {
    state.count = 0;
  });
});

export { increment, decrement, reset };
