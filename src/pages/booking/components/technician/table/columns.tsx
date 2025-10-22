import { createColumnHelper } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import SortHeader from "@/components/table/SortHeader";
import FilterHeader from "@/components/table/FilterHeader";

import type { Booking } from "@/types/models/booking"; // bạn cần có model này

export const getColumns = () => {
  const columnHelper = createColumnHelper<Booking>();

  return [
    // ✅ Checkbox select
    columnHelper.display({
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="!outline-none"
        />
      ),
      size: 40,
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="!outline-none"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    }),

    // ✅ Booking ID
    columnHelper.accessor("id", {
      id: "bookingId",
      header: (info) => <SortHeader title="Booking ID" info={info} />,
      size: 100,
      cell: (info) => (
        <span className="font-medium text-gray-800">{info.getValue()}</span>
      ),
      meta: { title: "Booking ID" },
    }),

    // ✅ Vehicle
    columnHelper.accessor("vehicle", {
      id: "vehicle",
      header: (info) => <SortHeader title="Vehicle" info={info} />,
      size: 160,
      cell: (info) => info.getValue() || "—",
      meta: { title: "Vehicle" },
    }),

    // ✅ Customer
    columnHelper.accessor("customer", {
      id: "customer",
      header: (info) => <SortHeader title="Customer" info={info} />,
      size: 160,
      cell: (info) => info.getValue() || "—",
      meta: { title: "Customer" },
    }),

    // ✅ Assigned Time
    columnHelper.accessor("assignedTime", {
      id: "assignedTime",
      header: (info) => <SortHeader title="Assigned Time" info={info} />,
      size: 160,
      cell: (info) => {
        const value = info.getValue();
        if (!value) return "—";
        const date = new Date(value);
        return date.toLocaleString();
      },
      enableSorting: true,
      sortingFn: "datetime",
    }),

    // ✅ Status (with Filter)
    columnHelper.accessor("status", {
      id: "status",
      header: ({ column }) => (
        <FilterHeader
          column={column}
          title="Status"
          selectedValue={column.getFilterValue() as string}
          onFilterChange={(value) => column.setFilterValue(value || undefined)}
        />
      ),
      size: 120,
      cell: (info) => {
        const value = info.getValue();
        const colorClass =
          value === "PENDING"
            ? "bg-yellow-100 text-yellow-700"
            : value === "ASSIGNED"
            ? "bg-blue-100 text-blue-700"
            : value === "COMPLETED"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700";
        return (
          <span
            className={`px-2 py-1 rounded-md text-xs font-medium ${colorClass}`}
          >
            {value}
          </span>
        );
      },
      meta: {
        filterOptions: ["PENDING", "ASSIGNED", "COMPLETED", "CANCELLED"],
      },
      filterFn: (row, columnId, filterValue) => {
        if (!filterValue) return true;
        return row.getValue(columnId) === filterValue;
      },
      enableSorting: false,
    }),

    // ✅ Actions
    columnHelper.display({
      id: "actions",
      header: "Actions",
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
    }),
  ];
};
