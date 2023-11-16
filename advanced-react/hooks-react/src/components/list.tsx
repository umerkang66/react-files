import { Fragment, useEffect, useState } from 'react';

interface ListProps {
  getItems: () => number[];
}

export default function List({ getItems }: ListProps) {
  const [items, setItems] = useState<number[]>([]);
  useEffect(() => {
    setItems(getItems());
    console.log('Updating item');
  }, [getItems]);

  return (
    <Fragment>
      {items.map(item => (
        <div key={item}>{item}</div>
      ))}
    </Fragment>
  );
}
