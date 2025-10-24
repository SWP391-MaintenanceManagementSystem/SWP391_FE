import { createColumnHelper } from "@tanstack/react-table";
import SortHeader from "@/components/table/SortHeader";
import FilterHeader from "@/components/table/FilterHeader";
import ColActions from "./ColAction";
import type { TechnicianBooking } from "@/types/models/booking";

export const getColumns = () => {
  const columnHelper = createColumnHelper<TechnicianBooking>();
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

    // Customer
    columnHelper.accessor("customer", {
      id: "fullName",
      header: (info) => <SortHeader title="Customer" info={info} />,
      size: 180,
      cell: (info) => {
        const c = info.getValue();
        return (
          <span className="text-gray-700 dark:text-gray-300 font-inter font-medium">
            {c ? `${c.firstName} ${c.lastName}` : "—"}
          </span>
        );
      },
      meta: { title: "Customer" },
    }),

    // Vehicle
    columnHelper.accessor("vehicle", {
      id: "licensePlate",
      header: (info) => <SortHeader title="Vehicle" info={info} />,
      size: 200,
      cell: (info) => {
        const v = info.getValue();
        if (!v) return "—";
        return (
          <div className="flex flex-col text-xs text-gray-700 dark:text-gray-300">
            <span className="text-gray-500 dark:text-white font-medium font-inter">
              {v.licensePlate}
            </span>
          </div>
        );
      },
      meta: { title: "Vehicle" },
    }),

    // Booking Time
    columnHelper.accessor(
      (row) => (row.bookingDate ? new Date(row.bookingDate).getTime() : 0),
      {
        id: "bookingDate",
        header: (info) => <SortHeader title="Booking Time" info={info} />,
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
        meta: { title: "Booking Time" },
      }
    ),

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
        filterOptions: [
          "ASSIGNED",
          "COMPLETED",
          "IN_PROGRESS",
          "PENDING",
          "CANCELLED",
        ],
        labelOptions: {
          ASSIGNED: "ASSIGNED",
          COMPLETED: "COMPLETED",
          IN_PROGRESS: "IN PROGRESS",
          PENDING: "PENDING",
          CANCELLED: "CANCELLED",
        },
      },
      cell: (info) => {
        const status = info.getValue();
        const colorMap: Record<string, string> = {
          ASSIGNED:
            "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300",
          COMPLETED:
            "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
          IN_PROGRESS:
            "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/40 dark:text-yellow-200",
          PENDING:
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
      // meta: { title: "Status" },
    }),

    // Assigner
    columnHelper.accessor("assigner", {
      id: "assigner",
      header: (info) => <SortHeader title="Assigner" info={info} />,
      cell: (info) => {
        const a = info.getValue();
        return (
          <span className="text-gray-700 dark:text-gray-300">
            {a ? `${a.firstName} ${a.lastName}` : "—"}
          </span>
        );
      },
      size: 160,
      meta: { title: "Assigner" },
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
