import { createColumnHelper } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import SortHeader from "@/components/table/SortHeader";
import FilterHeader from "@/components/table/FilterHeader";

import type { TechnicianBooking } from "@/types/models/booking"; // Đảm bảo model khớp
import ColActions from "./ColAction";

export const getColumns = () => {
  const columnHelper = createColumnHelper<TechnicianBooking>();

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
      size: 120,
      cell: (info) => (
        <span className="font-mono text-xs font-medium text-gray-800">
          {info.getValue().slice(0, 8)}...
        </span>
      ),
      meta: { title: "Booking ID" },
    }),

    // ✅ Customer (firstName + lastName)
    columnHelper.accessor("customer", {
      id: "customer",
      header: (info) => <SortHeader title="Customer" info={info} />,
      size: 180,
      cell: (info) => {
        const customer = info.getValue();
        if (!customer) return "—";
        return `${customer.firstName} ${customer.lastName}`;
      },
      sortingFn: (rowA, rowB) => {
        const nameA = `${rowA.original.customer?.firstName} ${rowA.original.customer?.lastName}`;
        const nameB = `${rowB.original.customer?.firstName} ${rowB.original.customer?.lastName}`;
        return nameA.localeCompare(nameB);
      },
      meta: { title: "Customer" },
    }),

    // ✅ Vehicle (brand + model + licensePlate)
    columnHelper.accessor("vehicle", {
      id: "vehicle",
      header: (info) => <SortHeader title="Vehicle" info={info} />,
      size: 200,
      cell: (info) => {
        const vehicle = info.getValue();
        if (!vehicle) return "—";
        return (
          <div className="flex flex-col text-xs">
            <span className="font-medium">
              {vehicle.brand} {vehicle.model}
            </span>
            <span className="text-gray-500">{vehicle.licensePlate}</span>
          </div>
        );
      },
      sortingFn: (rowA, rowB) => {
        const vA = rowA.original.vehicle;
        const vB = rowB.original.vehicle;
        const strA = `${vA?.brand} ${vA?.model} ${vA?.licensePlate}`;
        const strB = `${vB?.brand} ${vB?.model} ${vB?.licensePlate}`;
        return strA.localeCompare(strB);
      },
      meta: { title: "Vehicle" },
    }),

    // ✅ Booking Date & Shift
    columnHelper.display({
      id: "bookingTime",
      header: (info) => <SortHeader title="Booking Time" info={info} />,
      size: 180,
      cell: ({ row }) => {
        const bookingDate = row.original.bookingDate;
        const shift = row.original.shift;

        if (!bookingDate || !shift) return "—";

        const date = new Date(bookingDate);
        const formattedDate = date.toLocaleDateString();
        const formattedTime = date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        const shiftTime = `${new Date(shift.startTime).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })} - ${new Date(shift.endTime).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}`;

        return (
          <div className="flex flex-col text-xs">
            <span className="font-medium">
              {formattedDate} {formattedTime}
            </span>
            <span className="text-gray-500">{shift.name}</span>
            <span className="text-gray-400 text-xs">{shiftTime}</span>
          </div>
        );
      },
      sortingFn: (rowA, rowB) => {
        const dateA = new Date(rowA.original.bookingDate).getTime();
        const dateB = new Date(rowB.original.bookingDate).getTime();
        return dateA - dateB;
      },
      meta: { title: "Booking Time" },
    }),

    // ✅ Service Center
    columnHelper.accessor("serviceCenter.name", {
      id: "serviceCenter",
      header: (info) => <SortHeader title="Service Center" info={info} />,
      size: 180,
      cell: (info) => info.getValue() || "—",
      meta: { title: "Service Center" },
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
        const colorMap: Record<string, string> = {
          CONFIRMED: "bg-blue-100 text-blue-700",
          PENDING: "bg-yellow-100 text-yellow-700",
          ASSIGNED: "bg-indigo-100 text-indigo-700",
          COMPLETED: "bg-green-100 text-green-700",
          CANCELLED: "bg-red-100 text-red-700",
        };
        const colorClass = colorMap[value] || "bg-gray-100 text-gray-700";

        return (
          <span
            className={`px-2 py-1 rounded-md text-xs font-medium ${colorClass}`}
          >
            {value}
          </span>
        );
      },
      meta: {
        filterOptions: [
          "PENDING",
          "CONFIRMED",
          "ASSIGNED",
          "COMPLETED",
          "CANCELLED",
        ],
      },
      filterFn: (row, columnId, filterValue) => {
        if (!filterValue) return true;
        return row.getValue(columnId) === filterValue;
      },
      enableSorting: false,
    }),

    // ✅ Assigner
    columnHelper.accessor("assigner", {
      id: "assigner",
      header: (info) => <SortHeader title="Assigner" info={info} />,
      size: 160,
      cell: (info) => {
        const assigner = info.getValue();
        if (!assigner) return "—";
        return `${assigner.firstName} ${assigner.lastName}`;
      },
      sortingFn: (rowA, rowB) => {
        const a = `${rowA.original.assigner?.firstName} ${rowA.original.assigner?.lastName}`;
        const b = `${rowB.original.assigner?.firstName} ${rowB.original.assigner?.lastName}`;
        return a.localeCompare(b);
      },
      meta: { title: "Assigner" },
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
