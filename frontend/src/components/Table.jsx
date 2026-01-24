import './Table.css';

const Table = ({ 
  columns, 
  data, 
  onRowClick,
  loading = false,
  className = '',
  striped = false,
  hover = true
}) => {
  if (loading) {
    return (
      <div className="table-loading">
        <div className="loading-spinner">Loading data...</div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="table-empty">
        <p>No data available</p>
      </div>
    );
  }

  const tableClass = `table ${striped ? 'table-striped' : ''} ${hover ? 'table-hover' : ''} ${className}`;

  return (
    <div className="table-container">
      <table className={tableClass}>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} style={{ width: column.width }}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr 
              key={rowIndex} 
              onClick={() => onRowClick && onRowClick(row)}
              className={onRowClick ? 'clickable-row' : ''}
            >
              {columns.map((column, colIndex) => (
                <td key={colIndex}>
                  {column.render ? column.render(row[column.key], row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;