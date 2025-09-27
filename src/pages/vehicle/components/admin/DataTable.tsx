import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getPaginationRowModel,
  type ColumnFiltersState,
  type PaginationState,
} from "@tanstack/react-table";

import type { ColumnDef } from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";
import {
  Search,
  ChevronDown,
  Trash,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { DeleteDialog } from "@/components/dialog/DeleteDialog";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchValue: string;
  pageSize: number;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchValue,
  pageSize,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  });

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      rowSelection,
      pagination,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel(),
  });

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const handleDeleteAll = () => {
    console.log("Deleting rows: ", table.getSelectedRowModel().rows);
    // TODO: call API delete
  };

  return (
    <div className="w-full flex flex-col gap-2 font-inter">
      {/* TABLE ACTIONS*/}
      <div className="flex flex-col md:flex-row gap-2">
        <div className="relative w-full">
          <Search
            size={16}
            className="absolute text-gray-500 top-[25%] left-2"
          />
          <Input
            placeholder={"Searching " + searchValue + "..."}
            value={
              (table.getColumn(`${searchValue}`)?.getFilterValue() as string) ??
              ""
            }
            onChange={(event) => {
              table
                .getColumn(`${searchValue}`)
                ?.setFilterValue(event.target.value);
              console.log(event.target.value);
            }}
            className="max-w-sm pl-8"
          />
        </div>
        {table.getSelectedRowModel().rows.length > 1 && (
          <Button
            variant="destructive"
            className="mr-auto"
            onClick={() => setOpenDeleteDialog(true)}
          >
            Delete All <Trash />
          </Button>
        )}
        {/*Visible Column*/}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="mr-auto !outline-none">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/*TABLE*/}
      <div className="overflow-hidden rounded-md border flex flex-col flex-2/3">
        <Table>
          {/*TABLE HEADER*/}
          <TableHeader className="bg-background z-10 sticky top-0 shadow-xs">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          {/*TABLE BODY*/}
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={index % 2 === 0 ? "bg-accent" : "bg-background"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
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
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/*PAGINATION*/}
      <div className="flex justify-between items-center">
        <div className=" text-sm text-gray-500">
          {table.getSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row selected
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="!outline-none"
          >
            <ChevronLeft />
          </Button>
          <Button variant="outline" disabled>
            {table.getState().pagination.pageIndex + 1}
          </Button>
          <Button
            variant="outline"
            className="!outline-none"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight />
          </Button>
          <Button variant="outline" disabled>
            {table.getPageCount().toLocaleString()}
          </Button>
          <span className="text-sm text-gray-600">/ Page</span>
        </div>
      </div>

      {/*MODALS*/}
      <DeleteDialog
        open={openDeleteDialog}
        onOpenChange={setOpenDeleteDialog}
        onConfirm={handleDeleteAll}
      />
    </div>
  );
}
