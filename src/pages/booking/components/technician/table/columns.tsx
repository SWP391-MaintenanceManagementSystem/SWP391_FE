import { createColumnHelper } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import SortHeader from "@/components/table/SortHeader";
import FilterHeader from "@/components/table/FilterHeader";
import type { TechnicianBooking } from "@/types/models/booking";
import ColActions from "./ColAction";

export const getColumns = () => {
  const columnHelper = createColumnHelper<TechnicianBooking>();

  return [
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
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="!outline-none"
        />
      ),
      size: 40,
      enableSorting: false,
      enableHiding: false,
    }),

    //Booking ID
    columnHelper.accessor("id", {
      id: "bookingId",
      header: (info) => <SortHeader title="Booking ID" info={info} />,
      cell: (info) => (
        <span className="font-mono text-xs font-medium text-gray-800 dark:text-gray-200">
          {info.getValue()?.slice(0, 8) ?? "—"}
        </span>
      ),
      size: 120,
    }),

    //Customer
    columnHelper.accessor("customer", {
      id: "customer",
      header: (info) => <SortHeader title="Customer" info={info} />,
      cell: (info) => {
        const c = info.getValue();
        return (
          <span className="text-gray-700 dark:text-gray-300">
            {c ? `${c.firstName} ${c.lastName}` : "—"}
          </span>
        );
      },
      size: 180,
    }),

    //Vehicle
    columnHelper.accessor("vehicle", {
      id: "vehicle",
      header: (info) => <SortHeader title="Vehicle" info={info} />,
      cell: (info) => {
        const v = info.getValue();
        if (!v) return "—";
        return (
          <div className="flex flex-col text-xs text-gray-700 dark:text-gray-300">
            <span className="font-medium">
              {v.brand} {v.model}
            </span>
            <span className="text-gray-500 dark:text-gray-400">
              {v.licensePlate}
            </span>
          </div>
        );
      },
      size: 200,
    }),

    //Booking Time
    columnHelper.display({
      id: "bookingTime",
      header: (info) => <SortHeader title="Booking Time" info={info} />,
      cell: ({ row }) => {
        const { bookingDate, shift } = row.original;
        if (!bookingDate || !shift) return "—";

        const date = new Date(bookingDate);
        const formattedDate = date.toLocaleDateString();
        const shiftTime = `${new Date(shift.startTime).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })} - ${new Date(shift.endTime).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}`;

        return (
          <div className="flex flex-col text-xs text-gray-700 dark:text-gray-300">
            <span className="font-medium">{formattedDate}</span>
            <span className="text-gray-500 dark:text-gray-400">
              {shift.name}
            </span>
            <span className="text-gray-400 dark:text-gray-500">
              {shiftTime}
            </span>
          </div>
        );
      },
      size: 180,
    }),

    //Service Center
    columnHelper.accessor("serviceCenter.name", {
      id: "serviceCenter",
      header: (info) => <SortHeader title="Service Center" info={info} />,
      cell: (info) => (
        <span className="text-gray-700 dark:text-gray-300">
          {info.getValue() || "—"}
        </span>
      ),
      size: 180,
    }),

    //Status
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
      cell: (info) => {
        const status = info.getValue();
        const colorMap: Record<string, string> = {
          ASSIGNED:
            "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300",
          CONFIRMED:
            "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
          COMPLETED:
            "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
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
    }),

    // Actions
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
