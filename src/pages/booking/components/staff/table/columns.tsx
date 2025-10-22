import { createColumnHelper } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import SortHeader from "@/components/table/SortHeader";
import FilterHeader from "@/components/table/FilterHeader";
import AccountStatusTag from "@/components/tag/AccountStatusTag";
import type { ServiceCenter } from "@/types/models/center";
import { Badge } from "@/components/ui/badge";
import type { Booking } from "@/types/models/booking";

export const getColumns = (
  handleFilterChange: (field: string, value: string) => void,
  currentFilters: { status: string; centerId: string },
) => {
  const columnHelper = createColumnHelper<Booking>();

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
    columnHelper.accessor("customerId", {
      id: "firstName",
      header: (info) => <SortHeader title="First Name" info={info} />,
      size: 50,
      cell: (info) => info.getValue(),
      meta: {
        title: "First Name",
      },
    }),
  ];
};
