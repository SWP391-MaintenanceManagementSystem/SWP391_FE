import { createColumnHelper } from "@tanstack/react-table";
import { type Category, type Part } from "@/types/models/part";
import StockStatusTag from "@/components/tag/StockTag";
import { AlertTriangle } from "lucide-react";
import ColActions from "./ColAction";
import { Badge } from "@/components/ui/badge";
import SortHeader from "@/components/table/SortHeader";
import FilterHeader from "@/components/table/FilterHeader";

import type { TFunction } from "i18next";

export const getColumns = (
  handleFilterChange: (field: string, value: string) => void,
  currentFilter: { status: string; categoryName: string },
  categoryList: Category[],
  t: TFunction,
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
      id: "name",
      header: (info) => <SortHeader title={t("dashboard.admin.inventory.name")} info={info} />,
      cell: (info) => info.getValue(),
      meta: {
        title: t("dashboard.admin.inventory.name"),
      },
    }),

    columnHelper.accessor("category.name", {
      id: "categoryName",
      header: (info) => (
        <FilterHeader
          column={info.column}
          title={t("dashboard.admin.inventory.category")}
          selectedValue={currentFilter.categoryName}
          onFilterChange={(value) => handleFilterChange("categoryName", value)}
        />
      ),
      cell: (info) => <Badge variant="outline">{info.getValue()}</Badge>,
      meta: {
        title: t("dashboard.admin.inventory.category"),
        filterVariant: "filterCategory",
        filterOptions: categoryList.map((c) => c.name),
      },
    }),

    columnHelper.accessor("quantity", {
      header: (info) => <SortHeader title={t("dashboard.admin.inventory.quantity")} info={info} />,
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
      meta: { title: t("dashboard.admin.inventory.quantity") },
    }),
    columnHelper.accessor("status", {
      id: "status",
      header: (info) => (
        <FilterHeader
          column={info.column}
          title={t("dashboard.admin.inventory.status")}
          selectedValue={currentFilter.status}
          onFilterChange={(value) => handleFilterChange("status", value)}
        />
      ),
      cell: (info) => <StockStatusTag status={info.getValue()} />,
      filterFn: "equals",
      meta: {
        title: t("dashboard.admin.inventory.status"),
        filterVariant: "filterStatus",
        filterOptions: ["AVAILABLE", "OUT_OF_STOCK", "DISCONTINUED"],
        labelOptions: {
          AVAILABLE: t("dashboard.admin.inventory.status_types.available"),
          OUT_OF_STOCK: t("dashboard.admin.inventory.status_types.low_stock"),
          DISCONTINUED: t("dashboard.admin.inventory.status_types.discontinued"),
        },
      },
    }),
    columnHelper.accessor("price", {
      id: "price",
      header: (info) => <SortHeader title={t("dashboard.admin.inventory.price")} info={info} />,
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
        title: t("dashboard.admin.inventory.price"),
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
            categoryList={categoryList}
          />
        );
      },
    }),
  ];
};
