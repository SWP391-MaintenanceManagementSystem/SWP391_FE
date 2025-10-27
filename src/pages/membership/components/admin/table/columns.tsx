import { createColumnHelper } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import SortHeader from "@/components/table/SortHeader";
import FilterHeader from "@/components/table/FilterHeader";
import type { Membership } from "@/types/models/membership";
import ColActions from "./ColActions";

export const getColumns = () => {
  const columnHelper = createColumnHelper<Membership>();

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

    // NAME
    columnHelper.accessor("name", {
      id: "name",
      header: (info) => <SortHeader title="Name" info={info} />,
      size: 50,
      cell: (info) => info.getValue(),
      meta: {
        title: "Name",
      },
    }),

    // PRICE
    columnHelper.accessor("price", {
      id: "price",
      header: (info) => <SortHeader title="Price" info={info} />,
      size: 120,
      cell: (info) => `$${info.getValue().toLocaleString()}`,
      enableSorting: true,
      sortingFn: "basic",
    }),

    // DURATION
    columnHelper.accessor("duration", {
      id: "duration",
      header: (info) => <SortHeader title="Duration" info={info} />,
      size: 120,
      cell: (info) => `${info.getValue()} ${info.row.original.periodType}`,
      enableSorting: true,
      sortingFn: (rowA, rowB, columnId) => {
        const toDays = (duration: number, type: string) => {
          switch (type) {
            case "YEAR":
              return duration * 365;
            case "MONTH":
              return duration * 30;
            case "DAY":
            default:
              return duration;
          }
        };

        const a = toDays(
          rowA.getValue<number>(columnId),
          rowA.original.periodType
        );
        const b = toDays(
          rowB.getValue<number>(columnId),
          rowB.original.periodType
        );

        return a - b;
      },
    }),

    // STATUS
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
      cell: (info) => (
        <span
          className={`px-2 py-1 rounded-md text-xs font-medium ${
            info.getValue() === "ACTIVE"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {info.getValue()}
        </span>
      ),
      meta: {
        filterOptions: ["ACTIVE", "INACTIVE"],
      },
      filterFn: (row, columnId, filterValue) => {
        if (!filterValue) return true;
        return row.getValue(columnId) === filterValue;
      },
      enableSorting: false,
    }),

    // ACTIONS
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
