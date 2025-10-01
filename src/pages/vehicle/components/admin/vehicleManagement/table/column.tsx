import { createColumnHelper } from "@tanstack/react-table";
import type { Vehicle } from "@/types/models/vehicle";
import VehicleStatusTag from "@/components/tag/VehicleStatusTag";
import ColActions from "./ColActions";
import dayjs from "dayjs";

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
    header: "Model",
    cell: (info) => info.getValue(),
    meta: {
      title: "Model",
    },
  }),
  columnHelper.accessor("licensePlate", {
    id: "licensePlate",
    header: "License Plate",
    cell: (info) => info.getValue(),
    meta: {
      title: "License Plate",
    },
  }),
  columnHelper.accessor("vin", {
    id: "vin",
    header: "VIN",
    cell: (info) => info.getValue(),
    meta: {
      title: "VIN",
    },
  }),
  columnHelper.accessor("status", {
    id: "status",
    header: "Status",
    cell: (info) => <VehicleStatusTag status={info.getValue()} />,
    meta: {
      title: "Status",
    },
  }),
  columnHelper.accessor("lastService", {
    id: "lastService",
    header: "Last Service",
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
    cell: (props) => <ColActions row={props.row} />,
    enableSorting: false,
    enableHiding: false,
  }),
];
