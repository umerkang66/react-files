import { useState, useTransition, ChangeEvent } from 'react';

export default function UseTransitionComp() {
  const [isPending, startTransition] = useTransition();
  const [input, setInput] = useState('');
  const [list, setList] = useState<string[]>([]);

  const LIST_SIZE = 20; // 20000

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);

    startTransition(() => {
      // what is inside of this callback, has lower priority, than the other functions, setInput wil happen first, then this loop stuff
      const l = [];
      for (let i = 0; i <= LIST_SIZE; i++) {
        l.push(e.target.value);
      }
      setList(l);
    });
  }

  return (
    <div>
      <input type="text" value={input} onChange={handleChange} />
      {isPending
        ? 'loading...'
        : list.map((item, i) => {
            return <div key={i}>{item}</div>;
          })}
    </div>
  );
}
