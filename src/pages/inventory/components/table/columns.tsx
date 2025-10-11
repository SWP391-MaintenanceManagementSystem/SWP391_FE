import { createColumnHelper } from "@tanstack/react-table";
import { type Category, type Part } from "@/types/models/part";
import StockStatusTag from "@/components/tag/StockTag";
import { AlertTriangle } from "lucide-react";
import ColActions from "./ColAction";
import { Badge } from "@/components/ui/badge";
import SortHeader from "@/components/table/SortHeader";
import FilterHeader from "@/components/table/FilterHeader";

export const getColumns = (
  handleFilterChange: (field: string, value: string) => void,
  currentFilter: { status: string; categoryName: string },
  categoryList: Category[],
) => {
  const columnHelper = createColumnHelper<Part>();

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
    columnHelper.accessor("name", {
      id: "partName",
      header: (info) => <SortHeader title="Name" info={info} />,
      cell: (info) => info.getValue(),
      meta: {
        title: "Part Name",
      },
    }),

    columnHelper.accessor("category.name", {
      id: "categoryName",
      header: (info) => (
        <FilterHeader
          column={info.column}
          title="Category"
          selectedValue={currentFilter.categoryName}
          onFilterChange={(value) => handleFilterChange("categoryName", value)}
        />
      ),
      cell: (info) => <Badge variant="outline">{info.getValue()}</Badge>,
      meta: {
        title: "Category Name",
        filterVariant: "filterCategory",
        filterOptions: categoryList.map((c) => c.name),
      },
    }),

    columnHelper.accessor("quantity", {
      header: (info) => <SortHeader title="Quantity" info={info} />,
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
      meta: { title: "Quantity" },
    }),
    columnHelper.accessor("status", {
      id: "status",
      header: (info) => (
        <FilterHeader
          column={info.column}
          title="Status"
          selectedValue={currentFilter.status}
          onFilterChange={(value) => handleFilterChange("status", value)}
        />
      ),
      cell: (info) => <StockStatusTag status={info.getValue()} />,
      filterFn: "equals",
      meta: {
        title: "Status",
        filterVariant: "filterStatus",
        filterOptions: ["INSTOCK", "LOWSTOCK"],
        labelOptions: { INSTOCK: "In Stock", LOWSTOCK: "Low Stock" },
      },
    }),
    columnHelper.accessor("price", {
      id: "price",
      header: (info) => <SortHeader title="Price" info={info} />,
      cell: (info) => (
        <p>
          $
          {info.getValue().toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      ),
      meta: {
        title: "Price",
      },
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: (props) => {
        // const { pageIndex, pageSize } = props.table.getState().pagination;
        return <ColActions row={props.row} />;
      },
    }),
  ];
};
