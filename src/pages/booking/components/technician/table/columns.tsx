import { createColumnHelper } from "@tanstack/react-table";
import SortHeader from "@/components/table/SortHeader";
import FilterHeader from "@/components/table/FilterHeader";
import ColActions from "./ColAction";
import type { TechnicianBooking } from "@/types/models/booking";
import { Badge } from "@/components/ui/badge";
import dayjs from "dayjs";
import BookingTag from "@/components/tag/BookingTag";

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
      header: (info) => <SortHeader title="License Plate" info={info} />,
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
      meta: { title: "License Plate" },
    }),

    // Booking Time
    columnHelper.accessor("bookingDate", {
      id: "bookingDate",
      header: (info) => <SortHeader title="Booking Time" info={info} />,
      cell: (info) => (
        <Badge variant="outline">
          {dayjs(info.getValue()).format("HH:mm DD/MM/YYYY")}
        </Badge>
      ),
      meta: {
        title: "Booking Time",
      },
    }),

    // Service Center
    columnHelper.accessor((row) => row.serviceCenter?.name ?? "", {
      id: "center",
      header: (info) => <SortHeader title="Service Center" info={info} />,
      cell: (info) => <Badge variant="outline">{info.getValue() || "—"}</Badge>,
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
        filterOptions: ["ASSIGNED", "COMPLETED", "CANCELLED", "CHECKED_OUT"],
        labelOptions: {
          ASSIGNED: "Assigned",
          COMPLETED: "Completed",
          CANCELLED: "Cancelled",
          CHECKED_OUT: "Checked Out",
        },
      },
      cell: (info) => <BookingTag status={info.getValue()} />,
      size: 120,
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
