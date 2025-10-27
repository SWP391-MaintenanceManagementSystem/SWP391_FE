import { createColumnHelper } from "@tanstack/react-table";
import type { Shift } from "@/types/models/shift";
import type { ServiceCenter } from "@/types/models/center";
import { Badge } from "@/components/ui/badge";
import SortHeader from "@/components/table/SortHeader";
import FilterHeader from "@/components/table/FilterHeader";
import VehicleStatusTag from "@/components/tag/VehicleStatusTag";
import { Users } from "lucide-react";
import ColActions from "./ColActions";

export const getColumns = (
  handleFilterChange: (field: string, value: string) => void,
  currentFilter: { status: string; centerId: string },
  centerList: ServiceCenter[],
) => {
  const columnHelper = createColumnHelper<Shift>();

  return [
    columnHelper.display({
      id: "number",
      header: "#",
      size: 10,
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
      header: (info) => <SortHeader title="Name" info={info} />,
      cell: (info) => info.getValue(),
      meta: {
        title: "Shift Name",
      },
    }),
    columnHelper.accessor("startTime", {
      id: "startTime",
      header: "Start Time",
      size: 50,
      cell: (info) => (
        <Badge variant="outline">{info.getValue().slice(0, 5)}</Badge>
      ),
      meta: {
        title: "Start Time",
      },
    }),
    columnHelper.accessor("endTime", {
      id: "endTime",
      header: "End Time",
      size: 50,
      cell: (info) => (
        <Badge variant="outline">{info.getValue().slice(0, 5)}</Badge>
      ),
      meta: {
        title: "End Time",
      },
    }),
    columnHelper.accessor("serviceCenter.name", {
      id: "centerName",
      header: (info) => (
        <FilterHeader
          column={info.column}
          title="Work Center"
          selectedValue={currentFilter.centerId}
          onFilterChange={(value) => handleFilterChange("centerId", value)}
        />
      ),
      size: 50,
      cell: (info) => <Badge variant="outline">{info.getValue()}</Badge>,
      meta: {
        title: "Work Center",
        filterVariant: "filterWorkCenter",
        filterOptions: centerList.map((c) => c.id),
        labelOptions: Object.fromEntries(centerList.map((c) => [c.id, c.name])),
      },
    }),
    columnHelper.accessor("maximumSlot", {
      id: "maximumSlot",
      header: (info) => <SortHeader title="Maximum Slots" info={info} />,
      size: 50,
      cell: (info) => (
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{info.getValue()}</span>
        </div>
      ),
      meta: {
        title: "Maximum Slots",
      },
    }),
    columnHelper.accessor("status", {
      id: "status",
      header: (info) => (
        <FilterHeader
          title="Status"
          column={info.column}
          selectedValue={currentFilter.status}
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
      header: "Actions",
      cell: (props) => {
        const { pageIndex, pageSize } = props.table.getState().pagination;
        return (
          <ColActions
            row={props.row}
            currentPage={pageIndex + 1}
            currentPageSize={pageSize}
            centerList={centerList}
          />
        );
      },
    }),
  ];
};
