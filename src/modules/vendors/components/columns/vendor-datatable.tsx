"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
// import { Table } from "@tanstack/react-table"

// import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQueryParamaters } from "@/state-store/use-query-params";
import { FaSpinner } from "react-icons/fa";

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  total: number;
  limit: number;
  offset: number;
  showInput?: boolean;
  showPagination?: boolean;
  showAdvancedPagination?: boolean;
  placeholder?: string;
  columnFilterKey: string;
  isLoading: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  total,
  limit,
  offset,
  placeholder,
  columnFilterKey,
  showInput,
  showPagination,
  showAdvancedPagination,
  isLoading,
}: DataTableProps<TData, TValue>) {
  // const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState<any>([]);

  const calculatedPageIndex = offset / limit;

  const [pagination, setPagination] = useState({
    pageIndex: calculatedPageIndex, //initial page index
    pageSize: limit, //default page size
  });

  const { querykey, setQueryKey, backendPagination, setBackendPagination } =
    useQueryParamaters();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    getFilteredRowModel: getFilteredRowModel(),
    manualFiltering: true,
    rowCount: total,
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      globalFilter,
      pagination,
    },
  });

  return (
    <div>
      {showInput ? (
        <div className="flex items-center py-3 lg:w-auto w-full">
          <Input
            placeholder="Search by name or category"
            onChange={(e) => {
              setQueryKey(e.target.value);
            }}
            className="w-full lg:max-w-sm "
          />
        </div>
      ) : null}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-primary">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="text-gray-700 dark:text-muted-foreground">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
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
                  {isLoading ? (
                    <div className="flex justify-center items-center">
                      <FaSpinner className="animate-spin text-2xl text-orange-500" />
                    </div>
                  ) : (
                    "No results."
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {showPagination ? (
        <div className="flex items-center justify-end space-x-2 py-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              // backendPagination.offset = limit;
              // setBackendPagination(backendPagination);
              table.nextPage();
            }}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      ) : null}

      {showAdvancedPagination ? (
        <div className="mt-3 flex items-center justify-between px-2">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="flex items-center space-x-6 lg:space-x-8">
            {/* <div className="flex items-center space-x-2">
              <p className="text-sm font-medium">Rows per page</p>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value));
                }}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue
                    placeholder={table.getState().pagination.pageSize}
                  />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              </div> */}
            <div className="flex flex-col md:flex-row gap-3 md:gap-6 justify-center items-center">
              <div className="flex flex-row space-x-6">
                <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                  Page {table.getState().pagination.pageIndex + 1} of{" "}
                  {table.getPageCount()}
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    className="hidden h-8 w-8 p-0 lg:flex"
                    onClick={() => {
                      const newOffset = 0;
                      backendPagination.offset = newOffset;
                      setBackendPagination(backendPagination);

                      table.setPageIndex(0);
                    }}
                    disabled={!table.getCanPreviousPage()}
                  >
                    <span className="sr-only">Go to first page</span>
                    <ChevronsLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="h-8 w-8 p-0"
                    onClick={() => {
                      const newOffset = offset - limit;
                      backendPagination.offset = newOffset;
                      setBackendPagination(backendPagination);

                      table.previousPage();
                    }}
                    disabled={!table.getCanPreviousPage()}
                  >
                    <span className="sr-only">Go to previous page</span>
                    <ChevronLeftIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="h-8 w-8 p-0"
                    onClick={() => {
                      const newOffset = offset + limit;
                      backendPagination.offset = newOffset;
                      setBackendPagination(backendPagination);

                      // const pageCount = table.getPageCount();

                      // for (let i = 0; i < pageCount; i++) {
                      //   const newOffset = limit * i;
                      //   (backendPagination.offset = newOffset),
                      //     setBackendPagination(backendPagination);
                      // }
                      table.nextPage();
                    }}
                    disabled={!table.getCanNextPage()}
                  >
                    <span className="sr-only">Go to next page</span>
                    <ChevronRightIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="hidden h-8 w-8 p-0 lg:flex"
                    onClick={() => {
                      const pageCount = table.getPageCount();

                      const lastOffset = limit * (pageCount - 1);
                      backendPagination.offset = lastOffset;
                      setBackendPagination(backendPagination);

                      table.setPageIndex(table.getPageCount() - 1);
                    }}
                    disabled={!table.getCanNextPage()}
                  >
                    <span className="sr-only">Go to last page</span>
                    <ChevronsRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div>
                <Select
                  value={String(table.getState().pagination.pageSize)}
                  defaultValue="10"
                  onValueChange={(value) => {
                    backendPagination.limit = Number(value);
                    setBackendPagination(backendPagination);
                    table.setPageSize(Number(value)); // Convert back to number when setting
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select page size" />
                  </SelectTrigger>
                  <SelectContent>
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                      <SelectItem key={pageSize} value={String(pageSize)}>
                        {" "}
                        {/* value must be string */}
                        Show {pageSize}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
