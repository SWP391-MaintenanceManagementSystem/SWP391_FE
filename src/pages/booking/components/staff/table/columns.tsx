import { createColumnHelper } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import SortHeader from "@/components/table/SortHeader";
import FilterHeader from "@/components/table/FilterHeader";
import { Badge } from "@/components/ui/badge";
import type { BookingStaffTable } from "@/types/models/booking-with-detail";
import BookingTag from "@/components/tag/BookingTag";
import dayjs from "dayjs";
import ColActions from "./ColActions";

export const getColumns = (
  handleFilterChange: (
    field: string,
    value: string | boolean | undefined,
  ) => void,
  currentFilters: {
    status: string;
    isPremium: boolean | undefined;
  },
) => {
  const columnHelper = createColumnHelper<BookingStaffTable>();

  return [
    // SELECT checkbox
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
      size: 10,
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

    // Customer NAME
    columnHelper.accessor(
      (row) => `${row.customer.firstName} ${row.customer.lastName}`,
      {
        id: "fullName",
        header: (info) => <SortHeader title="Customer Name" info={info} />,
        cell: (info) => info.getValue(),
        meta: {
          title: "Customer Name",
        },
      },
    ),

    // Customer EMAIL
    columnHelper.accessor((row) => row.customer.email, {
      id: "email",
      header: (info) => <SortHeader title="Email" info={info} />,
      cell: (info) => info.getValue(),
      meta: {
        title: "Email",
      },
    }),

    columnHelper.accessor("customer.isPremium", {
      header: (info) => (
        <FilterHeader
          column={info.column}
          title="Premium"
          selectedValue={
            currentFilters.isPremium === undefined
              ? ""
              : currentFilters.isPremium
                ? "true"
                : "false"
          }
          onFilterChange={(value) =>
            handleFilterChange(
              "isPremium",
              value === "" ? undefined : value === "true",
            )
          }
        />
      ),
      size: 50,
      cell: (info) =>
        info.getValue() ? (
          <Badge variant="outline">Yes</Badge>
        ) : (
          <Badge variant="outline">No</Badge>
        ),
      filterFn: "equals",
      meta: {
        title: "Premium",
        filterVariant: "filterPremium",
        filterOptions: ["true", "false"],
        labelOptions: { true: "Yes", false: "No" },
      },
    }),

    // Vehicle Model
    columnHelper.accessor("vehicle.model", {
      id: "vehicleModel",
      header: (info) => <SortHeader title="Vehicle Model" info={info} />,
      cell: (info) => info.getValue(),
      meta: {
        title: "Vehicle Model",
      },
    }),

    // License Plate
    columnHelper.accessor("vehicle.licensePlate", {
      id: "licensePlate",
      header: (info) => <SortHeader title="License Plate" info={info} />,
      cell: (info) => <Badge variant="outline">{info.getValue()}</Badge>,
      meta: {
        title: "License Plate",
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
        filterOptions: [
          "PENDING",
          "ASSIGNED",
          "CANCELLED",
          "COMPLETED",
          "CHECKED_IN",
          "CHECKED_OUT",
        ],
        labelOptions: {
          PENDING: "Pending",
          ASSIGNED: "Assigned",
          CANCELLED: "Cancelled",
          COMPLETED: "Completed",
          CHECKED_IN: "Checked In",
          CHECKED_OUT: "Checked Out",
        },
      },
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

    columnHelper.display({
      id: "actions",
      header: "Actions",
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
