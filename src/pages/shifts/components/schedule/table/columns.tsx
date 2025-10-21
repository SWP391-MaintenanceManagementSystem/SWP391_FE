import { createColumnHelper } from "@tanstack/react-table";
import type { WorkSchedule, Shift } from "@/types/models/shift";
import type { ServiceCenter } from "@/types/models/center";
import { Badge } from "@/components/ui/badge";
import SortHeader from "@/components/table/SortHeader";
import FilterHeader from "@/components/table/FilterHeader";
import dayjs from "dayjs";
import { ShiftCell } from "./ShiftCell";
import ColActions from "./ColActions";

export const getColumns = (
  handleFilterChange: (field: string, value: string) => void,
  currentFilter: { shiftId: string; centerId: string; role: string },
  centerList: ServiceCenter[],
  shiftsList: Shift[],
) => {
  const columnHelper = createColumnHelper<WorkSchedule>();
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
    columnHelper.accessor(
      (row) =>
        `${row.account.profile?.firstName} ${row.account.profile?.lastName}`,
      {
        id: "fullName",
        header: (info) => <SortHeader title="Employee Name" info={info} />,
        cell: (info) => info.getValue(),
        meta: {
          title: "Employee Name",
        },
      },
    ),

    columnHelper.accessor("account.email", {
      id: "email",
      header: (info) => <SortHeader title="Email" info={info} />,
      cell: (info) => info.getValue(),
      meta: {
        title: "Email",
      },
    }),
    columnHelper.accessor("account.role", {
      id: "role",
      header: (info) => (
        <FilterHeader
          title="Role"
          column={info.column}
          selectedValue={currentFilter.role}
          onFilterChange={(value) => handleFilterChange("role", value)}
        />
      ),
      cell: (info) => <Badge variant="outline">{info.getValue()}</Badge>,
      size: 10,
      meta: {
        title: "Role",
        filterVariant: "filterRole",
        filterOptions: ["STAFF", "TECHNICIAN"],
        labelOptions: {
          STAFF: "Staff",
          TECHNICIAN: "Technician",
        },
      },
    }),
    columnHelper.accessor("date", {
      id: "date",
      header: (info) => <SortHeader title="Date" info={info} />,
      cell: (info) => dayjs(info.getValue()).format("DD/MM/YYYY"),
      size: 10,
      meta: {
        title: "Date",
      },
    }),
    columnHelper.accessor("shift.name", {
      id: "shiftName",
      header: (info) => (
        <FilterHeader
          column={info.column}
          title="Shift"
          selectedValue={currentFilter.shiftId}
          onFilterChange={(value) => handleFilterChange("shiftId", value)}
        />
      ),
      cell: ({ row }) => <ShiftCell shift={row.original.shift} />,
      meta: {
        title: "Shift",
        filterVariant: "filterShift",
        filterOptions: shiftsList.map((s) => s.id),
        labelOptions: Object.fromEntries(shiftsList.map((s) => [s.id, s.name])),
      },
    }),
    columnHelper.accessor("shift.serviceCenter.name", {
      id: "centerName",
      header: (info) => (
        <FilterHeader
          column={info.column}
          title="Work Center"
          selectedValue={currentFilter.centerId}
          onFilterChange={(value) => handleFilterChange("centerId", value)}
        />
      ),
      cell: (info) => <Badge variant="outline">{info.getValue()}</Badge>,
      meta: {
        title: "Work Center",
        filterVariant: "filterWorkCenter",
        filterOptions: centerList.map((c) => c.id),
        labelOptions: Object.fromEntries(centerList.map((c) => [c.id, c.name])),
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
};
