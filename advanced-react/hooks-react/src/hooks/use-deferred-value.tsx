import {
  useMemo,
  useDeferredValue,
  ChangeEvent,
  useState,
  Fragment,
  useEffect,
} from 'react';

interface ListProps {
  input: string;
}

function ListComponent({ input }: ListProps) {
  const LIST_SIZE = 20;
  // deferredInput only changes, when "main input" is not changing for a while (like debouncing logic)
  const deferredInput = useDeferredValue(input);
  const list = useMemo(() => {
    const l = [];
    for (let i = 0; i <= LIST_SIZE; i++) {
      l.push(<div key={i}>{deferredInput}</div>);
    }
    return l;
  }, [deferredInput]);

  useEffect(() => {
    console.log(`Input: ${input}\nDeferred: ${deferredInput}`);
  }, [input, deferredInput]);

  return (
    <Fragment>
      {list.map((item, i) => (
        <Fragment key={i}>{item}</Fragment>
      ))}
    </Fragment>
  );
}

export default function UseDeferredValue() {
  const [input, setInput] = useState('');
  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    setInput(e.target.value);
  }

  return (
    <div>
      <input type="text" value={input} onChange={handleChange} />
      <ListComponent input={input} />
    </div>
  );
}
