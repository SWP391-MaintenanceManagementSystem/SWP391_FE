import { createColumnHelper } from "@tanstack/react-table";
import SortHeader from "@/components/table/SortHeader";
import FilterHeader from "@/components/table/FilterHeader";
import type { CustomerBookingHistory } from "@/types/models/booking";
import ColActions from "./colAction";

export const getColumns = () => {
  const columnHelper = createColumnHelper<CustomerBookingHistory>();

  return [
    columnHelper.display({
      id: "number",
      header: "#",
      size: 50,
      cell: ({ row, table }) =>
        row.index +
        1 +
        table.getState().pagination.pageIndex *
          table.getState().pagination.pageSize,
      enableSorting: false,
      enableHiding: false,
    }),

    // Booking ID
    columnHelper.accessor("id", {
      id: "bookingId",
      header: "Booking ID",
      size: 120,
      cell: (info) => (
        <span className="font-inter font-medium text-gray-800 dark:text-gray-200">
          {info.getValue()?.slice(0, 8) ?? "—"}
        </span>
      ),
      meta: { title: "Booking ID" },
    }),

    // Booking Time
    columnHelper.accessor(
      (row) => (row.bookingDate ? new Date(row.bookingDate).getTime() : 0),
      {
        id: "bookingDate",
        header: (info) => <SortHeader title="Booking Date" info={info} />,
        cell: ({ row }) => {
          const { bookingDate, shift } = row.original;
          if (!bookingDate || !shift) return "—";

          const date = new Date(bookingDate);
          const formattedDate = date.toLocaleString();

          return (
            <div className="flex flex-col text-xs text-gray-700 dark:text-gray-300">
              <span className="font-medium font-inter">{formattedDate}</span>
            </div>
          );
        },
        enableSorting: true,
        size: 180,
        meta: { title: "Booking Date" },
      }
    ),

    // Status (filter dropdown)
    columnHelper.accessor("status", {
      id: "status",
      header: ({ column }) => (
        <FilterHeader
          column={column}
          title="Status"
          selectedValue={column.getFilterValue() as string}
          onFilterChange={(v) => column.setFilterValue(v || undefined)}
        />
      ),
      meta: {
        filterOptions: ["CHECKED_OUT", "CANCELLED"],
        labelOptions: {
          CHECKED_OUT: "CHECKED_OUT",
          CANCELLED: "CANCELLED",
        },
      },
      cell: (info) => {
        const status = info.getValue();
        const colorMap: Record<string, string> = {
          CHECKED_OUT:
            "bg-gray-300 text-gray-700 dark:bg-gray-900/40 dark:text-gray-300",
          CANCELLED:
            "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
        };
        return (
          <span
            className={`px-2 py-1 rounded-md text-xs font-medium ${
              colorMap[status] ||
              "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
            }`}
          >
            {status}
          </span>
        );
      },
      size: 120,
    }),

    // Service Center
    columnHelper.accessor((row) => row.serviceCenter?.name ?? "", {
      id: "center",
      header: (info) => <SortHeader title="Service Center" info={info} />,
      cell: (info) => (
        <span className="text-gray-700 dark:text-gray-300 font-inter font-medium">
          {info.getValue() || "—"}
        </span>
      ),
      enableSorting: true,
      sortingFn: "alphanumeric",
      size: 180,
      meta: { title: "Service Center" },
    }),

    //Total Cost
    columnHelper.accessor("totalCost", {
      id: "totalCost",
      header: (info) => <SortHeader title="Total Cost" info={info} />,
      cell: (info) => {
        const value = info.getValue();

        return (
          <span className="inline-flex items-center justify-center">
            <span
              className={`px-2 py-[2px] text-sm font-medium rounded-md font-inter
            ${
              value != null && value > 0
                ? "bg-gray-900 text-white dark:bg-gray-800"
                : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
            }`}
            >
              {value != null && value > 0 ? `$${value.toFixed(2)}` : "—"}
            </span>
          </span>
        );
      },
      enableSorting: true,
      size: 140,
      meta: { title: "Total Cost" },
    }),

    // Actions
    columnHelper.display({
      id: "actions",
      header: () => "Actions",
      size: 100,
      cell: ({ row, table }) => {
        const { pageIndex, pageSize } = table.getState().pagination;
        return (
          <ColActions
            row={row}
            currentPage={pageIndex + 1}
            currentPageSize={pageSize}
          />
        );
      },
      enableSorting: false,
      meta: { title: "Actions" },
    }),
  ];
};
