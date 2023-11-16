import { useEffect, useRef, useState } from 'react';

export default function UseRefHook() {
  const [name, setName] = useState('');
  const renderCount = useRef<number>(1);
  const prevName = useRef<string>('');

  useEffect(() => {
    renderCount.current += 1;
  });

  useEffect(() => {
    // this will run after the component has updated, so here value will changed to the original state, but the value that will be showed in component will be previous state (it runs after the component update)
    prevName.current = name;
  }, [name]);

  return (
    <div>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />
      <div>
        My name is {name}, and it used to be {prevName.current}
      </div>
      <div>I rendered {renderCount.current} times</div>
    </div>
  );
}
