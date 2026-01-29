import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { clsx } from 'clsx';
import {
  ChevronUpIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

const DataTable = ({
  columns,
  data,
  onRowClick,
  loading = false,
  emptyMessage = 'No data available',
  searchable = false,
  onSearch,
  sortable = true,
  onSort,
  className = '',
  rowClassName = '',
  headerClassName = '',
}) => {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSort = (columnId) => {
    if (!sortable) return;

    let direction = 'asc';
    if (sortColumn === columnId) {
      direction = sortDirection === 'asc' ? 'desc' : 'asc';
    }

    setSortColumn(columnId);
    setSortDirection(direction);

    if (onSort) {
      onSort({ column: columnId, direction });
    }
  };

  const filteredData = useMemo(() => {
    if (!searchTerm || !onSearch) return data;
    
    return data.filter((item) =>
      onSearch(item, searchTerm)
    );
  }, [data, searchTerm, onSearch]);

  const sortedData = useMemo(() => {
    if (!sortColumn || !sortable) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortColumn, sortDirection, sortable]);

  const renderCell = (row, column) => {
    if (column.render) {
      return column.render(row[column.accessor], row);
    }
    
    if (column.format) {
      return column.format(row[column.accessor]);
    }
    
    return row[column.accessor];
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading data...</p>
      </div>
    );
  }

  return (
    <div className={clsx('bg-white rounded-lg shadow-sm border border-gray-200', className)}>
      {searchable && (
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.accessor}
                  scope="col"
                  className={clsx(
                    'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
                    sortable && 'cursor-pointer hover:bg-gray-100',
                    column.headerClassName,
                    headerClassName
                  )}
                  onClick={() => sortable && column.sortable !== false && handleSort(column.accessor)}
                >
                  <div className="flex items-center gap-1">
                    {column.Header}
                    {sortable && column.sortable !== false && (
                      <span className="flex flex-col">
                        <ChevronUpIcon
                          className={clsx(
                            'h-3 w-3 -mb-1',
                            sortColumn === column.accessor && sortDirection === 'asc'
                              ? 'text-blue-600'
                              : 'text-gray-300'
                          )}
                        />
                        <ChevronDownIcon
                          className={clsx(
                            'h-3 w-3 -mt-1',
                            sortColumn === column.accessor && sortDirection === 'desc'
                              ? 'text-blue-600'
                              : 'text-gray-300'
                          )}
                        />
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData.length > 0 ? (
              sortedData.map((row, index) => (
                <tr
                  key={row.id || index}
                  className={clsx(
                    onRowClick && 'cursor-pointer hover:bg-gray-50',
                    rowClassName
                  )}
                  onClick={() => onRowClick && onRowClick(row)}
                >
                  {columns.map((column) => (
                    <td
                      key={`${row.id || index}-${column.accessor}`}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                    >
                      {renderCell(row, column)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <FunnelIcon className="h-12 w-12 text-gray-300 mb-4" />
                    <p className="text-gray-500 text-lg">{emptyMessage}</p>
                    {searchTerm && (
                      <p className="text-gray-400 text-sm mt-2">
                        No results found for "{searchTerm}"
                      </p>
                    )}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

DataTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      Header: PropTypes.string.isRequired,
      accessor: PropTypes.string.isRequired,
      render: PropTypes.func,
      format: PropTypes.func,
      sortable: PropTypes.bool,
      headerClassName: PropTypes.string,
    })
  ).isRequired,
  data: PropTypes.array.isRequired,
  onRowClick: PropTypes.func,
  loading: PropTypes.bool,
  emptyMessage: PropTypes.string,
  searchable: PropTypes.bool,
  onSearch: PropTypes.func,
  sortable: PropTypes.bool,
  onSort: PropTypes.func,
  className: PropTypes.string,
  rowClassName: PropTypes.string,
  headerClassName: PropTypes.string,
};

export default DataTable;
EOF