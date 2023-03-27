import { useReducer } from 'react';
import Button from '../components/button';
import Panel from '../components/panel';

import counterReducer, { actions } from '../reducers/counter';

export default function CounterPage() {
  const [state, dispatch] = useReducer(counterReducer, {
    count: 0,
    value: '',
  });

  const submitHandler = e => {
    e.preventDefault();
    dispatch(actions.addValue(+state.value));
  };

  return (
    <Panel className="m-3">
      <h1 className="text-lg">Count is {state.count}</h1>

      <div className="flex flex-row">
        <Button onClick={() => dispatch(actions.increment())}>Increment</Button>

        <Button onClick={() => dispatch(actions.decrement())}>Decrement</Button>
      </div>

      <form onSubmit={submitHandler}>
        <label>Add a lot!</label>
        <input
          value={state.value || ''}
          className="p-1 m-3 bg-gray-50 border border-gray-300"
          type="number"
          onChange={e => dispatch(actions.changeVal(e.target.value))}
        />
        <Button type="submit">Add</Button>
      </form>
    </Panel>
  );
}
