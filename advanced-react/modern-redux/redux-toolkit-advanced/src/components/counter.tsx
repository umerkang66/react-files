import { FC, useReducer } from 'react';

import {
  counterReducer,
  increment,
  decrement,
  reset,
} from '../features/counter-reducer';

const Counter: FC = () => {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <div>
      <h1>Count is: {state.count}</h1>
      <div>
        <button onClick={() => dispatch(increment(2))}>Increment</button>
        <button onClick={() => dispatch(decrement(2))}>Decrement</button>
        <button onClick={() => dispatch(reset())}>Reset</button>
      </div>
    </div>
  );
};

export default Counter;
