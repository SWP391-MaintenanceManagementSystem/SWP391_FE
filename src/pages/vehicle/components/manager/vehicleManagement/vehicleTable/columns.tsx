import { createColumnHelper } from "@tanstack/react-table";
import type { Vehicle, VehicleBrand } from "@/types/models/vehicle";
import VehicleStatusTag from "@/components/tag/VehicleStatusTag";
import ColActions from "./ColActions";
import SortHeader from "@/components/table/SortHeader";
import FilterHeader from "@/components/table/FilterHeader";
import type { AccountRole } from "@/types/enums/role";

export const getColumns = (
  handleFilterChange: (field: string, value: string) => void,
  currentFilters: { status: string; brandId: string },
  brandList: VehicleBrand[],
  currentUserRole: AccountRole,
) => {
  const columnHelper = createColumnHelper<Vehicle>();

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
    columnHelper.accessor("model", {
      id: "model",
      header: (info) => <SortHeader title="Model" info={info} />,
      cell: (info) => info.getValue(),
      meta: {
        title: "Model",
      },
    }),
    columnHelper.accessor("brand", {
      id: "brand",
      header: (info) => (
        <FilterHeader
          title="Brand"
          column={info.column}
          selectedValue={currentFilters.brandId}
          onFilterChange={(value) => handleFilterChange("brandId", value)}
        />
      ),
      cell: (info) => info.getValue(),
      meta: {
        title: "Brand",
        filterVariant: "filterBrand",
        filterOptions: brandList.map((c) => c.id),
        labelOptions: Object.fromEntries(brandList.map((b) => [b.id, b.name])),
      },
    }),

    columnHelper.accessor("licensePlate", {
      id: "licensePlate",
      header: (info) => <SortHeader title="License Plate" info={info} />,
      cell: (info) => info.getValue(),
      meta: {
        title: "License Plate",
      },
    }),
    columnHelper.accessor("vin", {
      id: "vin",
      header: (info) => <SortHeader title="VIN" info={info} />,
      cell: (info) => info.getValue(),
      meta: {
        title: "VIN",
      },
    }),
    columnHelper.accessor("status", {
      id: "status",
      header: (info) => (
        <FilterHeader
          title="Status"
          column={info.column}
          selectedValue={currentFilters.status}
          onFilterChange={(value) => handleFilterChange("status", value)}
        />
      ),
      cell: (info) => <VehicleStatusTag status={info.getValue()} />,
      filterFn: "equals",
      meta: {
        title: "Status",
        filterVariant: "filterStatus",
        filterOptions: ["ACTIVE", "INACTIVE"],
        labelOptions: { ACTIVE: "Active", INACTIVE: "Inactive" },
      },
    }),

    columnHelper.display({
      id: "actions",
      header: currentUserRole === "ADMIN" ? "Actions" : "View",
      size: currentUserRole === "ADMIN" ? 100 : 10,
      cell: (props) => {
        const { pageIndex, pageSize } = props.table.getState().pagination;
        return (
          <ColActions
            row={props.row}
            currentPage={pageIndex + 1}
            currentPageSize={pageSize}
            currentUserRole={currentUserRole}
          />
        );
      },
    }),
  ];
};
