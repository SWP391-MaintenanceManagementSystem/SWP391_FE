import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type ColumnFiltersState,
  type PaginationState,
  type VisibilityState,
  type SortingState,
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
  // Trash,
  ChevronLeft,
  ChevronRight,
  Loader,
} from "lucide-react";
import "animate.css";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { useState, useRef, useLayoutEffect } from "react";
// import { DeleteDialog } from "@/components/dialog/DeleteDialog";
import { useMemo } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageIndex?: number;
  pageSize?: number;
  totalPage?: number;
  onPageChange?: (pageIndex: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  manualPagination?: boolean;
  isLoading?: boolean;
  isSearch?: boolean;
  manualSearch?: boolean;
  searchValue?: string[];
  searchPlaceholder?: string;
  onSearchChange?: (search: string) => void;
  sorting?: SortingState;
  onSortingChange?: (sorting: SortingState) => void;
  manualSorting?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageIndex,
  pageSize,
  totalPage,
  onPageChange,
  onPageSizeChange,
  manualPagination = false,
  isLoading,
  isSearch = false,
  searchValue = [],
  searchPlaceholder,
  onSearchChange,
  manualSearch = false,
  sorting,
  onSortingChange,
  manualSorting = false,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: pageIndex ?? 0,
    pageSize: pageSize ?? 10,
  });
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [searchText, setSearchText] = useState("");

  const filteredData = useMemo(() => {
    if (manualSearch) return data;
    if (!searchText) return data;

    return data.filter((item) =>
      searchValue.some((key) =>
        String(item[key as keyof TData] ?? "")
          .toLowerCase()
          .includes(searchText.toLowerCase()),
      ),
    );
  }, [data, searchText, manualSearch, searchValue]);

  const tableContainerRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const el = tableContainerRef.current;
    if (!el) return;

    const MIN_ROWS = 5;
    const rowHeight = 48;
    const headerHeight = 48;
    const observer = new ResizeObserver(() => {
      const containerHeight = el.clientHeight;
      const usableHeight = containerHeight - headerHeight;
      const newSize = Math.max(
        1,
        Math.floor(usableHeight / rowHeight),
        MIN_ROWS,
      );

      setPagination((prev) => ({ ...prev, pageSize: newSize }));
      if (onPageSizeChange) onPageSizeChange(newSize);
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [onPageSizeChange]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      columnFilters,
      rowSelection,
      pagination,
      columnVisibility,
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    enableColumnResizing: true,
    columnResizeMode: "onChange",
    pageCount: totalPage,
    manualPagination: manualPagination,
    onPaginationChange: (updater) => {
      const next =
        typeof updater === "function" ? updater(pagination) : updater;
      setPagination(next);
      if (onPageChange) onPageChange(next.pageIndex);
      if (onPageSizeChange) onPageSizeChange(next.pageSize);
      if (onSearchChange) onSearchChange(searchText);
    },
    ...(manualSorting ? {} : { getSortedRowModel: getSortedRowModel() }),
    manualSorting: manualSorting,
    onSortingChange: (updaterOrValue) => {
      if (!onSortingChange) return;

      if (typeof updaterOrValue === "function") {
        onSortingChange(updaterOrValue(sorting ?? []));
      } else {
        onSortingChange(updaterOrValue);
      }
    },
  });

  //const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  // const handleDeleteAll = () => {
  //   console.log("Deleting rows: ", table.getSelectedRowModel().rows);
  //   if (onDeleteAll) {
  //     onDeleteAll();
  //   }
  // };

  const handleSearchInput = (value: string) => {
    setSearchText(value);
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    if (onSearchChange) onSearchChange(value);
  };

  return (
    <div className="grid gap-4 h-full font-inter grid-rows-[auto_1fr_auto]">
      {/* TABLE ACTIONS*/}
      <div className="flex flex-col md:flex-row w-full gap-2 items-end justify-end">
        {isSearch && (
          <div className="relative w-full">
            <Search
              size={16}
              className="absolute text-gray-500 top-[10px] left-2"
            />
            <Input
              placeholder={`Search by ${searchPlaceholder}...`}
              value={searchText}
              onChange={(e) => handleSearchInput(e.target.value)}
              className="pl-8 lg:w-sm w-full "
            />
          </div>
        )}
        {/*{table.getSelectedRowModel().rows.length > 1 && (
          <Button
            variant="destructive"
            className="mr-auto"
            onClick={() => setOpenDeleteDialog(true)}
          >
            Delete All <Trash />
          </Button>
        )}*/}
        {/*Visible Column*/}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className=" !outline-none w-full md:w-28">
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
                    {column.columnDef.meta?.title ?? column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/*TABLE*/}
      <div
        className=" h-full rounded-md border flex flex-col overflow-x-auto w-full table-auto"
        ref={tableContainerRef}
      >
        <Table>
          {/*TABLE HEADER*/}
          <TableHeader className="bg-background z-10 sticky top-0 shadow-xs">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{ position: "relative", width: header.getSize() }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                      {header.column.getCanResize() && (
                        <div
                          onMouseDown={header.getResizeHandler()}
                          onTouchStart={header.getResizeHandler()}
                          className={`resizer ${header.column.getIsResizing() ? "isResizing" : ""}`}
                        ></div>
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
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="w-full odd:bg-accent even:bg-background"
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
            ) : isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24">
                  <Loader className="animate-spin text-gray-500 mx-auto" />
                </TableCell>
              </TableRow>
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

      {/* ROWS SELECTED */}
      <div className="flex justify-between items-start">
        {table.getSelectedRowModel().rows.length > 0 && (
          <div className=" text-sm text-gray-500">
            {table.getSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row selected
          </div>
        )}

        {/*PAGINATION*/}
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="!outline-none"
          >
            <ChevronLeft />
          </Button>
          <Input
            type="number"
            value={table.getState().pagination.pageIndex + 1}
            min="1"
            max={totalPage}
            onChange={(e) => {
              let newPage = Number(e.target.value) - 1;
              if (newPage < 0) newPage = 0;
              if (newPage >= table.getPageCount())
                newPage = table.getPageCount() - 1;
              table.setPageIndex(newPage);
            }}
            className="border border-gray-300 rounded px-2 w-14 text-center"
          />
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
          <span className="text-sm text-accent-foreground">/ Page</span>
        </div>
      </div>

      {/*MODALS*/}
      {/*<DeleteDialog
        open={openDeleteDialog}
        onOpenChange={setOpenDeleteDialog}
        onConfirm={handleDeleteAll}
      />*/}
    </div>
  );
}
