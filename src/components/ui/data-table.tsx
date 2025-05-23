
import React from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  PaginationState,
  OnChangeFn,
} from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DataTableSearch } from './data-table-search';
import { DataTablePagination } from './data-table-pagination';
import { DataTableExport } from './data-table-export';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onExport?: () => void;
  exportFileName?: string;
  pagination?: PaginationState;
  onPaginationChange?: OnChangeFn<PaginationState>;
  pageCount?: number;
  sorting?: SortingState;
  onSortingChange?: OnChangeFn<SortingState>;
  loading?: boolean;
  noDataMessage?: string;
  searchable?: boolean;
  onSearch?: (searchTerm: string) => void;
  manualPagination?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onExport,
  exportFileName,
  pagination,
  onPaginationChange,
  pageCount,
  sorting,
  onSortingChange,
  loading = false,
  noDataMessage = 'No data available',
  searchable = false,
  onSearch,
  manualPagination = false,
}: DataTableProps<TData, TValue>) {
  const [searchTerm, setSearchTerm] = React.useState('');

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: !manualPagination ? getPaginationRowModel() : undefined,
    manualPagination: manualPagination,
    pageCount: pageCount,
    onPaginationChange: onPaginationChange,
    state: {
      pagination: pagination,
      sorting: sorting,
    },
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: onSortingChange,
    manualSorting: !!onSortingChange,
  });

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    
    if (onSearch) {
      onSearch(value);
    }
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
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
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
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
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

      {(pagination || (!manualPagination && data.length > 10)) && (
        <DataTablePagination table={table} totalCount={data.length} />
      )}
    </div>
  );
}
