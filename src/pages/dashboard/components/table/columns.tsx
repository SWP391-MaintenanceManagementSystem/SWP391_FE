import { createColumnHelper } from "@tanstack/react-table";
import SortHeader from "@/components/table/SortHeader";
import FilterHeader from "@/components/table/FilterHeader";
import { Badge } from "@/components/ui/badge";
import dayjs from "dayjs";
import BookingTag from "@/components/tag/BookingTag";
import type { Booking } from "@/types/models/booking";
import ColActions from "./ColAction";
import type { TFunction } from "i18next";

export const getColumns = (t: TFunction) => {
  const columnHelper = createColumnHelper<Booking>();

  return [
    // STT
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
      header: t("dashboard.bookings.booking_id"),
      size: 150,
      cell: (info) => (
        <span className="font-inter font-medium text-gray-800 dark:text-gray-200">
          {info.getValue()?.slice(0, 8) ?? "—"}
        </span>
      ),
      enableSorting: false,
      meta: { title: t("dashboard.bookings.booking_id") },
    }),

    // Booking Date
    columnHelper.accessor("bookingDate", {
      id: "bookingDate",
      header: (info) => <SortHeader title={t("dashboard.bookings.date")} info={info} />,
      cell: (info) => (
        <Badge variant="outline">
          {dayjs(info.getValue()).format("HH:mm DD/MM/YYYY")}
        </Badge>
      ),
      size: 160,
      meta: { title: t("dashboard.bookings.date") },
    }),

    // Service Center
    columnHelper.accessor((row) => row.center?.name ?? "", {
      id: "service",
      header: (info) => <SortHeader title={t("dashboard.bookings.service_center")} info={info} />,
      cell: (info) => (
        <span className="font-inter text-gray-700 dark:text-gray-300">
          {info.getValue() || "—"}
        </span>
      ),
      enableSorting: true,
      sortingFn: "alphanumeric",
      size: 200,
      meta: { title: t("dashboard.bookings.service_center") },
    }),

    // Status
    columnHelper.accessor("status", {
      id: "status",
      header: ({ column }) => (
        <FilterHeader
          column={column}
          title={t("dashboard.bookings.status")}
          selectedValue={column.getFilterValue() as string}
          onFilterChange={(v) => column.setFilterValue(v || undefined)}
        />
      ),
      meta: {
        filterOptions: ["PENDING", "ASSIGNED", "CHECKED_IN", "COMPLETED"],
        labelOptions: {
          PENDING: t("dashboard.bookings.status_types.pending"),
          ASSIGNED: t("dashboard.bookings.status_types.assigned"),
          CHECKED_IN: t("dashboard.bookings.status_types.checked_in"),
          COMPLETED: t("dashboard.bookings.status_types.completed"),
        },
      },
      cell: (info) => <BookingTag status={info.getValue()} />,
      size: 140,
    }),

    // Total Cost
    columnHelper.accessor("totalCost", {
      id: "total",
      header: (info) => <SortHeader title={t("dashboard.bookings.total")} info={info} />,
      cell: (info) => (
        <span className="font-medium text-gray-800 dark:text-gray-200">
          ${info.getValue()?.toFixed(2) ?? "0.00"}
        </span>
      ),
      size: 100,
      meta: { title: t("dashboard.bookings.total") },
    }),

    columnHelper.display({
      id: "actions",
      header: t("dashboard.bookings.actions"),
      size: 80,
      cell: ({ row, table }) => (
        <ColActions
          row={row}
          currentPage={table.getState().pagination.pageIndex + 1}
          currentPageSize={table.getState().pagination.pageSize}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    }),
  ];
};
