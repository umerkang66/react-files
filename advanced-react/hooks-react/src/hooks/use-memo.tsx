import { ReactElement, useMemo, useState } from 'react';

export default function UseMemoComponent(): ReactElement {
  const [number, setNumber] = useState<number>(0);
  const [dark, setDark] = useState<boolean>(false);
  const doubleNumber = useMemo<number>(() => slowFunction(number), [number]);

  const themeStyle = useMemo(() => {
    // once this components rerenders or re-updates, other than dark state changes, don't create new obj of this themeStyle
    return {
      backgroundColor: dark ? '#333' : '#eee',
      color: dark ? '#eee' : '#333',
      margin: '5rem',
      padding: '5rem',
    };
  }, [dark]);

  return (
    <div>
      <input
        type="number"
        value={number}
        onChange={e => setNumber(parseInt(e.target.value))}
      />
      <button onClick={() => setDark(prevTheme => !prevTheme)}>
        Change Theme
      </button>
      <div style={themeStyle}>{doubleNumber}</div>
    </div>
  );
}

function slowFunction(num: number): number {
  console.log('Calling slow function');
  for (let i = 0; i <= 1000000000; i++) {}
  return num * 2;
}
