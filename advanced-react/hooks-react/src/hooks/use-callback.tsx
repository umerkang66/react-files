import { useState, CSSProperties, useCallback } from 'react';
import List from '../components/list';

export default function UseCallback() {
  const [number, setNumber] = useState<number>(1);
  const [dark, setDark] = useState<boolean>(false);

  // memoized the whole function, when this component is rerendered, everything will be created again, but this callback function will only be changed when number (dependencies) will change
  const getItems = useCallback(() => {
    return [number, number + 1, number + 2];
  }, [number]);

  const theme: CSSProperties = {
    backgroundColor: dark ? '#333' : '#eee',
    color: dark ? '#eee' : '#333',
    margin: '5rem',
    padding: '5rem',
  };

  return (
    <div style={theme}>
      <input
        type="number"
        value={number}
        onChange={e => setNumber(parseInt(e.target.value))}
      />
      <button onClick={() => setDark(prevState => !prevState)}>
        Toggle Theme
      </button>
      <List getItems={getItems} />
    </div>
  );
}
