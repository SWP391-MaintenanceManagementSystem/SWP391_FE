import { createColumnHelper } from "@tanstack/react-table";
import type { Vehicle } from "@/types/models/vehicle";
import VehicleStatusTag from "@/components/tag/VehicleStatusTag";
import ColActions from "./ColActions";
import dayjs from "dayjs";
import SortHeader from "@/components/table/SortHeader";
import FilterHeader from "@/components/table/FilterHeader";

const columnHelper = createColumnHelper<Vehicle>();

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
  columnHelper.accessor("model", {
    id: "model",
    header: (info) => <SortHeader title="Model" info={info} />,
    cell: (info) => info.getValue(),
    meta: {
      title: "Model",
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
        onFilterChange={(value) => {
          info.column.setFilterValue(value || undefined);
        }}
        selectedValue={(info.column.getFilterValue() as string) || ""}
      />
    ),
    cell: (info) => <VehicleStatusTag status={info.getValue()} />,
    filterFn: "equalsString",
    meta: {
      title: "Status",
      filterOptions: ["ACTIVE", "INACTIVE"],
      labelOptions: { ACTIVE: "Active", INACTIVE: "Inactive" },
    },
  }),
  columnHelper.accessor("lastService", {
    id: "lastService",
    header: (info) => <SortHeader title="Last Service" info={info} />,
    cell: (info) => {
      const lastServiceDate = info.getValue();
      return lastServiceDate
        ? dayjs(lastServiceDate).format("YYYY-MM-DD")
        : "N/A";
    },
    meta: {
      title: "Last Service",
    },
  }),

  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: (props) => {
      return <ColActions row={props.row} />;
    },
  }),
];
