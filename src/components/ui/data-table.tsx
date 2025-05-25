
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DataTableSearch } from './data-table-search';
import { DataTableExport } from './data-table-export';

interface Column<TData> {
  accessorKey?: string;
  header: string | React.ReactNode;
  cell?: ({ row }: { row: { original: TData } }) => React.ReactNode;
}

interface DataTableProps<TData> {
  columns: Column<TData>[];
  data: TData[];
  onExport?: () => void;
  exportFileName?: string;
  loading?: boolean;
  noDataMessage?: string;
  searchable?: boolean;
  onSearch?: (searchTerm: string) => void;
}

export function DataTable<TData>({
  columns,
  data,
  onExport,
  exportFileName,
  loading = false,
  noDataMessage = 'No data available',
  searchable = false,
  onSearch,
}: DataTableProps<TData>) {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    
    if (onSearch) {
      onSearch(value);
    }
  };

  const getCellValue = (row: TData, column: Column<TData>) => {
    if (column.cell) {
      return column.cell({ row: { original: row } });
    }
    if (column.accessorKey) {
      return (row as any)[column.accessorKey];
    }
    return '';
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        {searchable && (
          <DataTableSearch value={searchTerm} onChange={handleSearch} />
        )}
        
        {onExport && (
          <div className={`${searchable ? 'ml-2' : 'ml-auto'}`}>
            <DataTableExport onExport={onExport} fileName={exportFileName} />
          </div>
        )}
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column, index) => (
                <TableHead key={column.accessorKey || index}>
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Loading data...
                </TableCell>
              </TableRow>
            ) : data.length ? (
              data.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns.map((column, columnIndex) => (
                    <TableCell key={column.accessorKey || columnIndex}>
                      {getCellValue(row, column)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {noDataMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
