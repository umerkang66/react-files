import { useLayoutEffect, useState } from 'react';

export default function UseLayoutEffect() {
  const [count, setCount] = useState(0);

  // useEffect is asynchronous, it will run in the background, and give its results, when it has been ran (usually after the dom has rendered)

  // useLayoutEffect is synchronous, it runs after react has calculated the dom, and before dom is showed on the browser

  // useEffect is more performant
  useLayoutEffect(() => {
    console.log(count);
  }, [count]);

  return (
    <div>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>
        Increment
      </button>
      <div>{count}</div>
    </div>
  );
}
