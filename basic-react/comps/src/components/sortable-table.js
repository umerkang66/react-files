import { GoArrowSmallUp, GoArrowSmallDown } from 'react-icons/go';
import { useSorting } from '../hooks/use-sorting';
import Table from './table';

export default function SortableTable(props) {
  const { config, data } = props;
  const { sortOrder, sortBy, sortedData, setSortColumn } = useSorting(
    config,
    data
  );

  const updatedConfig = config.map(curCol => {
    if (!curCol.sortValue) {
      return curCol;
    }

    return {
      ...curCol,
      header: () => (
        <div
          className="cursor-pointer hover:bg-gray-100"
          onClick={() => setSortColumn(curCol.label)}
        >
          <div className="flex items-center">
            {getIcons(curCol.label, sortBy, sortOrder)}
            {curCol.label}
          </div>
        </div>
      ),
    };
  });

  return <Table {...props} config={updatedConfig} data={sortedData} />;
}

function getIcons(label, sortBy, sortOrder) {
  if (label !== sortBy) {
    return (
      <div>
        <GoArrowSmallUp />
        <GoArrowSmallDown />
      </div>
    );
  }

  if (sortOrder === null) {
    return (
      <div>
        <GoArrowSmallUp />
        <GoArrowSmallDown />
      </div>
    );
  } else if (sortOrder === 'asc') {
    return (
      <div>
        <GoArrowSmallUp />
      </div>
    );
  } else if (sortOrder === 'desc') {
    return (
      <div>
        <GoArrowSmallDown />
      </div>
    );
  }
}
