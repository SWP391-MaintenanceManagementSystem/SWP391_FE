import { createColumnHelper } from "@tanstack/react-table";
import SortHeader from "@/components/table/SortHeader";
import FilterHeader from "@/components/table/FilterHeader";
import { Badge } from "@/components/ui/badge";
import type { BookingStaffTable } from "@/types/models/booking-with-detail";
import BookingTag from "@/components/tag/BookingTag";
import dayjs from "dayjs";
import { CenterCell } from "@/pages/shifts/admin/schedules/table/CenterCell";
import type { ServiceCenter } from "@/types/models/center";
import ColActions from "./ColActions";

export const getColumns = (
  handleFilterChange: (
    field: string,
    value: string | boolean | undefined,
  ) => void,
  currentFilters: {
    status: string;
  },
) => {
  const columnHelper = createColumnHelper<BookingStaffTable>();

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

    // Booking date
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

    // Booking Status
    columnHelper.accessor("status", {
      id: "status",
      header: (info) => (
        <FilterHeader
          column={info.column}
          title="Booking Status"
          selectedValue={currentFilters.status}
          onFilterChange={(value) => handleFilterChange("status", value)}
        />
      ),
      cell: (info) => <BookingTag status={info.getValue()} />,
      meta: {
        title: "Booking Status",
        filterVariant: "filterBookingStatus",
        filterOptions: ["CANCELLED", "CHECKED_OUT"],
        labelOptions: {
          CANCELLED: "Cancelled",
          CHECKED_OUT: "Checked Out",
        },
      },
    }),
    columnHelper.accessor("totalCost", {
      id: "totalCost",
      header: (info) => <SortHeader title="Total Cost" info={info} />,
      cell: (info) => <Badge variant="default">${info.getValue()}</Badge>,
      meta: {
        title: "Total Cost",
      },
    }),
    columnHelper.accessor("serviceCenter.name", {
      id: "serviceCenter",
      header: (info) => <SortHeader title="Service Center" info={info} />,
      cell: ({ row }) => (
        <CenterCell center={row.original.serviceCenter as ServiceCenter} />
      ),
      meta: {
        title: "Service Center",
      },
    }),

    columnHelper.display({
      id: "actions",
      header: "View",
      size: 10,
      cell: (props) => {
        const { pageIndex, pageSize } = props.table.getState().pagination;
        return (
          <ColActions
            row={props.row}
            currentPage={pageIndex + 1}
            currentPageSize={pageSize}
          />
        );
      },
    }),
  ];
};
