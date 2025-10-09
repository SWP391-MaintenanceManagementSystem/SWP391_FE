import { createColumnHelper } from "@tanstack/react-table";
import { type Part } from "@/types/models/part";
import StockStatusTag from "@/components/tag/StockTag";
import { AlertTriangle } from "lucide-react";
import ColActions from "./ColAction";
import { Badge } from "@/components/ui/badge";

const columnHelper = createColumnHelper<Part & { categoryName: string }>();

export const columns = [
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
  columnHelper.accessor("partName", {
    id: "partName",
    header: "Name",
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("categoryName", {
    id: "categoryName",
    header: "Category",
    cell: (info) => <Badge variant="outline">{info.getValue()}</Badge>,
  }),

  columnHelper.accessor("quantity", {
    header: "Quantity",
    cell: ({ row }) => {
      const item = row.original;

      return (
        <div className="flex items-center gap-2">
          {item.quantity <= item.minStock && (
            <AlertTriangle className="h-4 w-4 text-destructive" />
          )}
          <span>{item.quantity}</span>
          <span className="text-sm text-muted-foreground">
            (min: {item.minStock})
          </span>
        </div>
      );
    },
  }),
  columnHelper.accessor("status", {
    id: "status",
    header: "Status",
    cell: (info) => <StockStatusTag status={info.getValue()} />,
    meta: {
      title: "Status",
      filterOptions: ["INSTOCK", "LOWSTOCK"],
      labelOptions: { INSTOCK: "In Stock", LOWSTOCK: "Low Stock" },
    },
  }),
  columnHelper.accessor("price", {
    id: "price",
    header: "Price",
    cell: (info) => <p>${info.getValue().toFixed(2)}</p>,
  }),
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: (props) => {
      return <ColActions row={props.row} />;
    },
  }),
];
