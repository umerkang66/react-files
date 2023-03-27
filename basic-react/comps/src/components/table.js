export default function Table({ data, config, keyFn }) {
  const renderedHeaders = config.map(curCol => {
    if (curCol.header) {
      const header = curCol.header();
      // if custom header is available, add that
      return <th key={curCol.label}>{header}</th>;
    }

    return <th key={curCol.label}>{curCol.label}</th>;
  });

  const renderedRows = data.map((rowData, i) => {
    const currentRow = config.map(curCol => {
      return (
        <td key={curCol.label} className="p-3">
          {curCol.render(rowData)}
        </td>
      );
    });

    return (
      <tr className="border-b" key={keyFn(rowData)}>
        {currentRow}
      </tr>
    );
  });

  return (
    <table className="table-auto border-spacing-2">
      <thead>
        <tr className="border-b-2">{renderedHeaders}</tr>
      </thead>
      <tbody>{renderedRows}</tbody>
    </table>
  );
}
