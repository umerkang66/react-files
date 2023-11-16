import { useState } from 'react';

function useSorting(config, data) {
  const [sortOrder, setSortOrder] = useState(null);
  const [sortBy, setSortBy] = useState(null);

  const setSortColumn = label => {
    if (sortBy && label !== sortBy) {
      // we were previously sorting by some other label, but now started with some other label
      setSortOrder('asc');
      setSortBy(label);
      return;
    }

    if (sortOrder === null) {
      setSortOrder('asc');
      setSortBy(label);
    } else if (sortOrder === 'asc') {
      setSortOrder('desc');
      setSortBy(label);
    } else if (sortOrder === 'desc') {
      setSortOrder(null);
      setSortBy(null);
    }
  };

  let sortedData = data;
  if (sortOrder && sortBy) {
    const { sortValue } = config.find(curCol => curCol.label === sortBy);

    sortedData = [...data].sort((a, b) => {
      // by which value we have to sort (we are not getting value from label, because label might be some other value, and data might have some other values)
      const valueA = sortValue(a);
      const valueB = sortValue(b);

      const isReverseOrder = sortOrder === 'asc' ? 1 : -1;

      if (typeof valueA === 'string') {
        return valueA.localeCompare(valueB) * isReverseOrder;
      } else {
        // it is a number
        return (valueA - valueB) * isReverseOrder;
      }
    });
  }

  return { sortOrder, sortBy, sortedData, setSortColumn };
}

export { useSorting };
