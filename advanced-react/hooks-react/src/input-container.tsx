import { ChangeEvent } from 'react';
import useLocalStorage from './custom-hooks/use-localstorage-hook';

export default function InputContainer() {
  const [input, setInput] = useLocalStorage('input', 'umer');
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div>
      <input type="text" value={input} onChange={handleChange} />
    </div>
  );
}
