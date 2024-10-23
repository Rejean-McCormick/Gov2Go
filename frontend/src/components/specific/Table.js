import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Table.css'; // Optional: import CSS for styling

const Table = ({ data, columns, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState('');
  const [filterText, setFilterText] = useState('');

  // Sorting function
  const handleSort = (field) => {
    setSortField(field);
    // Implement sorting logic
  };

  // Filtering function
  const handleFilter = (event) => {
    setFilterText(event.target.value);
  };

  // Filtering data based on user input
  const filteredData = data.filter(item =>
    Object.values(item).some(value =>
      value.toString().toLowerCase().includes(filterText.toLowerCase())
    )
  );

  // Sorting data
  const sortedData = [...filteredData].sort((a, b) => {
    if (sortField) {
      return a[sortField] > b[sortField] ? 1 : -1;
    }
    return 0;
  });

  // Pagination logic
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Render table headers
  const renderTableHeader = () => {
    return (
      <tr>
        {columns.map((col, index) => (
          <th key={index} onClick={() => handleSort(col.accessor)}>
            {col.Header}
          </th>
        ))}
      </tr>
    );
  };

  // Render table rows
  const renderTableRows = () => {
    return paginatedData.map((item, index) => (
      <tr key={index}>
        {columns.map((col, colIndex) => (
          <td key={colIndex}>{item[col.accessor]}</td>
        ))}
      </tr>
    ));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Filter..."
        value={filterText}
        onChange={handleFilter}
      />
      <table>
        <thead>{renderTableHeader()}</thead>
        <tbody>{renderTableRows()}</tbody>
      </table>
      {/* Pagination controls would go here */}
    </div>
  );
};

// Prop types for type checking
Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      Header: PropTypes.string.isRequired,
      accessor: PropTypes.string.isRequired,
    })
  ).isRequired,
  itemsPerPage: PropTypes.number,
};

// Default props
Table.defaultProps = {
  itemsPerPage: 10,
};

export default Table;
 
