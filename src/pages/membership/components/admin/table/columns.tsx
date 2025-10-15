import { createColumnHelper } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import SortHeader from "@/components/table/SortHeader";
import FilterHeader from "@/components/table/FilterHeader";
import type { Membership } from "@/types/models/membership";
import ColActions from "./ColActions";

export const getColumns = (
  handleFilterChange: (field: string, value: string | undefined) => void,
  currentFilters: { status: string },
) => {
  const columnHelper = createColumnHelper<Membership>();

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
      size: 120,
      cell: (info) => info.getValue(),
    }),

    // PRICE
    columnHelper.accessor("price", {
      id: "price",
      header: (info) => <SortHeader title="Price" info={info} />,
      size: 100,
      cell: (info) => `$${info.getValue().toLocaleString()}`,
    }),

    // DURATION
    columnHelper.accessor("duration", {
      id: "duration",
      header: (info) => <SortHeader title="Duration" info={info} />,
      size: 100,
      cell: (info) => `${info.getValue()} ${info.row.original.periodType}`,
    }),

    // STATUS
    columnHelper.accessor("status", {
      id: "status",
      header: (info) => (
        <FilterHeader
          column={info.column}
          title="Status"
          selectedValue={currentFilters.status}
          onFilterChange={(value) => handleFilterChange("status", value)}
        />
      ),
      size: 100,
      cell: (info) => (
        <span
          className={`px-2 py-1 rounded-md text-xs ${
            info.getValue() === "ACTIVE"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {info.getValue()}
        </span>
      ),
    }),

    // ACTIONS
    columnHelper.display({
      id: "actions",
      header: "Actions",
      size: 80,
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
    }),
  ];
};
