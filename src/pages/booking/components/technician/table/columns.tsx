import { createColumnHelper } from "@tanstack/react-table";
import SortHeader from "@/components/table/SortHeader";
import FilterHeader from "@/components/table/FilterHeader";
import type { TechnicianBooking } from "@/types/models/booking";
import ColActions from "./ColAction";

export const getColumns = () => {
  const columnHelper = createColumnHelper<TechnicianBooking>();

  return [
    //Booking ID
    columnHelper.accessor("id", {
      id: "bookingId",
      header: (info) => <SortHeader title="Booking ID" info={info} />,
      cell: (info) => (
        <span className="font-inter font-medium text-gray-800 dark:text-gray-200">
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
          <span className="text-gray-700 dark:text-gray-300 font-inter font-medium">
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
            <span className="text-gray-500 dark:text-white font-medium font-inter">
              {v.licensePlate}
            </span>
          </div>
        );
      },
      size: 200,
    }),

    //Booking Time (sort theo ngày)
    columnHelper.accessor(
      (row) => (row.bookingDate ? new Date(row.bookingDate).getTime() : 0),
      {
        id: "bookingTime",
        header: (info) => <SortHeader title="Booking Time" info={info} />,
        cell: ({ row }) => {
          const { bookingDate, shift } = row.original;
          if (!bookingDate || !shift) return "—";

          const date = new Date(bookingDate);
          const formattedDate = date.toLocaleDateString();
          const shiftTime = `${new Date(shift.startTime).toLocaleTimeString(
            [],
            {
              hour: "2-digit",
              minute: "2-digit",
            }
          )} - ${new Date(shift.endTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}`;

          return (
            <div className="flex flex-col text-xs text-gray-700 dark:text-gray-300">
              <span className="font-medium">{formattedDate}</span>
              <span className="text-gray-400 dark:text-gray-500">
                {shiftTime}
              </span>
            </div>
          );
        },
        enableSorting: true,
        size: 180,
      }
    ),

    //Service Center
    columnHelper.accessor((row) => row.serviceCenter?.name ?? "", {
      id: "serviceCenter",
      header: (info) => <SortHeader title="Service Center" info={info} />,
      cell: (info) => (
        <span className="text-gray-700 dark:text-gray-300 font-inter font-medium">
          {info.getValue() || "—"}
        </span>
      ),
      enableSorting: true,
      sortingFn: "alphanumeric",
      size: 180,
    }),

    //Status (filter dropdown)
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
          "IN PROGRESS",
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
    }),

    //Assigner
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

    //Actions
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
