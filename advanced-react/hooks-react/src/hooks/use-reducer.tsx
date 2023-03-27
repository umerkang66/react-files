import { useReducer } from 'react';

enum CountActionKind {
  INCREMENT = 'INCREMENT',
  DECREMENT = 'DECREMENT',
}
interface CountAction {
  type: CountActionKind;
  // how much to increment or decrement the number
  payload: number;
}
interface CountState {
  count: number;
}

function reducer(state: CountState, action: CountAction) {
  switch (action.type) {
    case CountActionKind.INCREMENT:
      return { ...state, count: state.count + action.payload };

    case CountActionKind.DECREMENT:
      return { ...state, count: state.count - action.payload };

    default:
      return state;
  }
}

export default function UseReducerComponent() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  function increment(): void {
    dispatch({ type: CountActionKind.INCREMENT, payload: 1 });
  }
  function decrement(): void {
    dispatch({ type: CountActionKind.DECREMENT, payload: 1 });
  }

  return (
    <div>
      <button onClick={decrement}>Decrement</button>
      <div>{state.count}</div>
      <button onClick={increment}>Increment</button>
    </div>
  );
}
